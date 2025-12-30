# Script to Remove Sensitive Jupyter Notebook from Git History
# WARNING: This will rewrite Git history - make a backup first!

Write-Host "`n=== Removing Sensitive Data from Git History ===`n" -ForegroundColor Yellow

# Step 1: Backup current state
Write-Host "[1/6] Creating backup branch..." -ForegroundColor Cyan
git branch backup-before-cleanup
Write-Host "✓ Backup created: 'backup-before-cleanup'" -ForegroundColor Green

# Step 2: Remove backup filter-branch refs (if any)
Write-Host "`n[2/6] Cleaning previous filter-branch attempts..." -ForegroundColor Cyan
Remove-Item -Path ".git/refs/original" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "✓ Cleaned" -ForegroundColor Green

# Step 3: Filter out the sensitive file from ALL history
Write-Host "`n[3/6] Removing firebase_uploader.ipynb from ALL commits..." -ForegroundColor Cyan
Write-Host "This may take a moment..." -ForegroundColor Gray

$env:FILTER_BRANCH_SQUELCH_WARNING = "1"
git filter-branch --force --index-filter `
  "git rm --cached --ignore-unmatch python_code/firebase_uploader.ipynb" `
  --prune-empty --tag-name-filter cat -- --all

Write-Host "✓ File removed from history" -ForegroundColor Green

# Step 4: Clean up references
Write-Host "`n[4/6] Cleaning up Git references..." -ForegroundColor Cyan
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive
Write-Host "✓ References cleaned" -ForegroundColor Green

# Step 5: Verify removal
Write-Host "`n[5/6] Verifying file removal..." -ForegroundColor Cyan
$fileInHistory = git log --all --full-history --pretty=format:"%h" -- python_code/firebase_uploader.ipynb
if ($fileInHistory) {
    Write-Host "⚠ WARNING: File still found in history!" -ForegroundColor Red
    Write-Host "Commits containing the file:" -ForegroundColor Yellow
    git log --all --full-history --oneline -- python_code/firebase_uploader.ipynb
} else {
    Write-Host "✓ File successfully removed from ALL commits!" -ForegroundColor Green
}

# Step 6: Check for API key in history
Write-Host "`n[6/6] Scanning for API keys in history..." -ForegroundColor Cyan
$keyInHistory = git log --all -S "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" --oneline
if ($keyInHistory) {
    Write-Host "⚠ WARNING: API key still found in history!" -ForegroundColor Red
    Write-Host $keyInHistory
} else {
    Write-Host "✓ No API keys found in history!" -ForegroundColor Green
}

Write-Host "`n=== NEXT STEPS ===`n" -ForegroundColor Yellow
Write-Host "1. Review the changes above" -ForegroundColor White
Write-Host "2. If everything looks good, force push:" -ForegroundColor White
Write-Host "   git push origin --force --all`n" -ForegroundColor Cyan
Write-Host "3. After pushing, all collaborators must re-clone the repo!" -ForegroundColor Red
Write-Host "`nIf something went wrong, restore backup with:" -ForegroundColor Yellow
Write-Host "   git checkout backup-before-cleanup`n" -ForegroundColor Cyan
