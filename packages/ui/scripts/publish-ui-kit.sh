#!/bin/bash
#
# Lighthouse HLTH UI Kit Publishing Script
#
# Purpose: Safely publish UI kit to GitHub Package Registry
# Usage: ./scripts/publish-ui-kit.sh [version]
#
# Prerequisites:
# 1. GitHub PAT with write:packages, read:packages scopes
# 2. .npmrc configured in UI kit repo
# 3. Clean git working directory
#

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
UI_KIT_PATH="/Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-ui"
APP_PATH="/Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-app"

# Functions
print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"

    # Check if UI kit directory exists
    if [ ! -d "$UI_KIT_PATH" ]; then
        print_error "UI kit directory not found: $UI_KIT_PATH"
        exit 1
    fi
    print_success "UI kit directory found"

    # Check if .npmrc exists
    if [ ! -f "$UI_KIT_PATH/.npmrc" ]; then
        print_error ".npmrc not found in UI kit directory"
        print_info "Run: cp $UI_KIT_PATH/.npmrc.example $UI_KIT_PATH/.npmrc"
        print_info "Then update with your GitHub PAT"
        exit 1
    fi
    print_success ".npmrc found"

    # Check npm authentication
    cd "$UI_KIT_PATH"
    if npm whoami --registry=https://npm.pkg.github.com > /dev/null 2>&1; then
        print_success "npm authenticated to GitHub Packages"
    else
        print_error "npm authentication failed"
        print_info "Check your .npmrc token has write:packages scope"
        exit 1
    fi

    # Check git status
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "Git working directory is not clean"
        print_info "Uncommitted changes:"
        git status --short
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        print_success "Git working directory is clean"
    fi
}

# Build package
build_package() {
    print_header "Building Package"

    cd "$UI_KIT_PATH"

    print_info "Running: npm run build:lib"
    if npm run build:lib; then
        print_success "Build completed successfully"
    else
        print_error "Build failed"
        exit 1
    fi
}

# Run tests (if available)
run_tests() {
    print_header "Running Tests"

    cd "$UI_KIT_PATH"

    # Check if test script exists
    if npm run | grep -q "test"; then
        print_info "Running: npm test"
        if npm test; then
            print_success "Tests passed"
        else
            print_error "Tests failed"
            exit 1
        fi
    else
        print_warning "No test script found - skipping"
    fi
}

# Dry run publish
dry_run_publish() {
    print_header "Dry Run Publish"

    cd "$UI_KIT_PATH"

    print_info "Running: npm publish --dry-run"
    if npm publish --dry-run 2>&1 | tee /tmp/npm-publish-dry-run.log; then
        print_success "Dry run completed successfully"

        # Extract package info
        PACKAGE_NAME=$(cat package.json | grep '"name"' | head -1 | sed 's/.*"\(.*\)".*/\1/')
        PACKAGE_VERSION=$(cat package.json | grep '"version"' | head -1 | sed 's/.*"\(.*\)".*/\1/')

        print_info "Package: $PACKAGE_NAME@$PACKAGE_VERSION"
    else
        print_error "Dry run failed"
        exit 1
    fi
}

# Publish package
publish_package() {
    print_header "Publishing Package"

    cd "$UI_KIT_PATH"

    PACKAGE_NAME=$(cat package.json | grep '"name"' | head -1 | sed 's/.*"\(.*\)".*/\1/')
    PACKAGE_VERSION=$(cat package.json | grep '"version"' | head -1 | sed 's/.*"\(.*\)".*/\1/')

    print_warning "About to publish: $PACKAGE_NAME@$PACKAGE_VERSION"
    read -p "Continue? (y/N): " -n 1 -r
    echo

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Publish cancelled"
        exit 0
    fi

    print_info "Running: npm publish"
    if npm publish; then
        print_success "Package published successfully!"
        print_info "Published: $PACKAGE_NAME@$PACKAGE_VERSION"
    else
        print_error "Publish failed"
        exit 1
    fi
}

# Verify publication
verify_publication() {
    print_header "Verifying Publication"

    cd "$UI_KIT_PATH"

    PACKAGE_NAME=$(cat package.json | grep '"name"' | head -1 | sed 's/.*"\(.*\)".*/\1/')
    PACKAGE_VERSION=$(cat package.json | grep '"version"' | head -1 | sed 's/.*"\(.*\)".*/\1/')

    print_info "Checking package: $PACKAGE_NAME@$PACKAGE_VERSION"

    # Wait a few seconds for registry to update
    sleep 3

    if npm view "$PACKAGE_NAME@$PACKAGE_VERSION" version > /dev/null 2>&1; then
        print_success "Package verified in registry"
        npm view "$PACKAGE_NAME@$PACKAGE_VERSION"
    else
        print_warning "Package not yet visible in registry (may take a few minutes)"
    fi
}

# Update app dependency
update_app_dependency() {
    print_header "Update App Dependency"

    PACKAGE_VERSION=$(cd "$UI_KIT_PATH" && cat package.json | grep '"version"' | head -1 | sed 's/.*"\(.*\)".*/\1/')

    print_info "App can now use: \"@1nd1g0labs/lighthouse-hlth-ui\": \"$PACKAGE_VERSION\""
    print_info ""
    print_info "Update app/package.json:"
    print_info "  Before: \"@1nd1g0labs/lighthouse-hlth-ui\": \"file:../lighthouse-hlth-ui\""
    print_info "  After:  \"@1nd1g0labs/lighthouse-hlth-ui\": \"$PACKAGE_VERSION\""
    print_info ""
    read -p "Update app package.json now? (y/N): " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd "$APP_PATH"

        # Backup package.json
        cp package.json package.json.backup

        # Update dependency (using perl for cross-platform compatibility)
        perl -i -pe "s/\"@1nd1g0labs\/lighthouse-hlth-ui\": \"file:..\/lighthouse-hlth-ui\"/\"@1nd1g0labs\/lighthouse-hlth-ui\": \"$PACKAGE_VERSION\"/" package.json

        print_success "Updated app package.json"
        print_info "Installing from registry..."

        # Remove old installation
        rm -rf node_modules/@1nd1g0labs/lighthouse-hlth-ui

        # Install from registry
        if npm install; then
            print_success "Installed from GitHub Packages"
            rm package.json.backup
        else
            print_error "Installation failed"
            print_warning "Restoring backup..."
            mv package.json.backup package.json
            exit 1
        fi
    else
        print_info "Skipped app update"
    fi
}

# Main execution
main() {
    print_header "Lighthouse HLTH UI Kit Publishing"

    check_prerequisites
    build_package
    run_tests
    dry_run_publish
    publish_package
    verify_publication
    update_app_dependency

    print_header "Publishing Complete"
    print_success "UI kit successfully published!"
    print_info ""
    print_info "Next steps:"
    print_info "1. Test app locally: cd $APP_PATH && npm run dev"
    print_info "2. Update Vercel environment variable: NPM_TOKEN=<your-github-pat>"
    print_info "3. Deploy to production: git push origin main"
    print_info ""
    print_info "For troubleshooting, see:"
    print_info "  docs/github-packages-publishing-fix.md"
}

# Run main function
main "$@"
