# Storybook Deployment Guide

This guide explains how to deploy the WakeCap Design System Storybook to GitHub Pages using GitHub Actions.

## 🚀 Quick Start

### 1. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Manual Deployment

1. Go to the **Actions** tab in your repository
2. Select **Manual Storybook Deployment** workflow
3. Click **Run workflow**
4. Choose your options:
   - **Environment**: `production` or `staging`
   - **Skip tests**: `true` to skip tests, `false` to run them
   - **Build mode**: `production` or `development`
5. Click **Run workflow**

### 3. Automatic Deployment

The workflow will automatically deploy when:
- Changes are pushed to the `main` branch
- Pull requests are created targeting `main`
- Manual trigger is used

## 📋 Workflow Options

### Manual Deployment Options

| Option | Description | Default | Options |
|--------|-------------|---------|---------|
| `environment` | Deployment environment | `production` | `production`, `staging` |
| `skip_tests` | Skip running tests | `false` | `true`, `false` |
| `build_mode` | Storybook build mode | `production` | `production`, `development` |

### Automatic Triggers

- **Push to main**: Deploys when design system files change
- **Pull Request**: Builds and tests (doesn't deploy)
- **Manual**: Full control over deployment options

## 🔧 Configuration

### Required Files

The workflow expects these files to exist:
- `package.json` with `build-storybook` script
- `.storybook/` configuration directory
- Design system components in `design-system/` and `components/`

### Environment Variables

No additional environment variables are required. The workflow uses:
- GitHub's built-in Pages deployment
- Node.js 18 with npm caching
- Automatic artifact management

## 📊 Workflow Steps

### 1. Build and Test Job
- ✅ Checkout repository
- ✅ Setup Node.js 18 with npm cache
- ✅ Install dependencies (`npm ci`)
- ✅ Run linting (optional)
- ✅ Run type checking (optional)
- ✅ Run tests (if not skipped)
- ✅ Build Storybook (`npm run build-storybook`)
- ✅ Upload build artifacts

### 2. Deploy Job
- ✅ Download build artifacts
- ✅ Setup GitHub Pages
- ✅ Upload to GitHub Pages
- ✅ Deploy to live URL

### 3. Notification Job
- ✅ Display deployment status
- ✅ Show live URL
- ✅ Report any errors

## 🌐 Accessing Your Storybook

After successful deployment, your Storybook will be available at:
- **Production**: `https://wakecap.github.io/blockwork/`
- **Staging**: `https://wakecap.github.io/blockwork/` (with staging environment)

## 🛠️ Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are in `package.json`
2. **Tests fail**: Use `skip_tests: true` option for manual deployment
3. **Pages not updating**: Clear browser cache or wait a few minutes
4. **Permission errors**: Ensure GitHub Pages is enabled in repository settings

### Debug Steps

1. Check the **Actions** tab for detailed logs
2. Verify all required files exist
3. Ensure `build-storybook` script works locally
4. Check repository permissions for GitHub Pages

### Local Testing

Test the build process locally:
```bash
# Install dependencies
npm ci

# Build Storybook
npm run build-storybook

# Check build output
ls -la storybook-static/
```

## 📝 Customization

### Adding New Triggers

Edit `.github/workflows/manual-deploy.yml`:
```yaml
on:
  workflow_dispatch:
    # ... existing inputs
  schedule:
    - cron: '0 0 * * 1'  # Weekly deployment
```

### Adding Environment Variables

Add to the workflow:
```yaml
env:
  CUSTOM_VAR: ${{ secrets.CUSTOM_VAR }}
```

### Custom Build Commands

Modify the build step:
```yaml
- name: Custom build step
  run: |
    npm run custom-build
    npm run build-storybook
```

## 🔒 Security

- Uses GitHub's official actions
- No external dependencies
- Minimal permissions required
- Artifacts are automatically cleaned up

## 📈 Monitoring

- Check deployment status in **Actions** tab
- Monitor build times and success rates
- Review logs for any issues
- Set up notifications for failed deployments

## 🎯 Best Practices

1. **Test locally** before deploying
2. **Use staging environment** for testing
3. **Monitor build times** and optimize if needed
4. **Keep dependencies updated**
5. **Document any custom configurations**

---

For more information, see the [GitHub Pages documentation](https://docs.github.com/en/pages) and [GitHub Actions documentation](https://docs.github.com/en/actions).
