# Claude Development Workflow

## Branch Management

### IMPORTANT: Always Base Feature Branches on Master

When creating a new feature branch for development:

1. **Always start from master/main branch**
   ```bash
   git fetch origin master
   git checkout -b claude/feature-name-XXXXX origin/master
   ```

2. **Never create orphan branches**
   - Don't start with `git init` or create unrelated histories
   - Always branch from the existing master/main branch

3. **Branch naming convention**
   - Format: `claude/<descriptive-name>-<session-id>`
   - Example: `claude/review-todo-tasks-OlGdu`
   - The session ID suffix is required for push permissions

### Pull Latest Changes from Master

Before starting work, always pull latest changes:
```bash
git fetch origin master
git merge origin/master
# Or if instructed to pull specific files:
git checkout origin/master -- path/to/file
```

### Committing and Pushing

1. Commit changes regularly:
   ```bash
   git add .
   git commit -m "Descriptive message"
   ```

2. Push to remote (always use -u flag):
   ```bash
   git push -u origin claude/feature-name-XXXXX
   ```

3. **Branch name MUST:**
   - Start with `claude/`
   - End with the session ID
   - Otherwise push will fail with 403 error

### Network Retry Policy

For git operations (push/pull/fetch), retry up to 4 times with exponential backoff if network errors occur:
- 1st retry: wait 2 seconds
- 2nd retry: wait 4 seconds
- 3rd retry: wait 8 seconds
- 4th retry: wait 16 seconds

### Creating Pull Requests

When work is complete:
1. Ensure all changes are committed and pushed
2. Create PR to master/main (not to any other branch)
3. Include clear description of changes

## Common Issues

### Unrelated Histories Error

If you see `refusing to merge unrelated histories`:
- This means the branch was created from a different initial commit
- **Solution:** Create a new branch from master and reapply changes:
  ```bash
  git checkout -b claude/new-branch-name-XXXXX origin/master
  # Copy or cherry-pick changes from old branch
  git show old-branch:path/to/file > path/to/file
  git add path/to/file
  git commit -m "Message"
  ```

### Uncommitted Changes Hook

If you see stop hook feedback about uncommitted changes:
- The repository has a hook that prevents operations with uncommitted changes
- Always commit and push before ending a session
- Check status: `git status`

## Development Process

1. Review TODO.md for tasks
2. Create/update branch from master
3. Implement features incrementally
4. Commit after each logical change
5. Push regularly to remote
6. When complete, create PR to master
