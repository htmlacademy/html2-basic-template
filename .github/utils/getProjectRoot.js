import { env } from "node:process"

/**
 * Get the path to the project root when deploying to GitHub Pages.
 * Your action should set `REPO_NAME` and `REPO_NAME` environment variables at the step you need
 * (most likely when building the project), for example like this:
 *
 * - name: Build project
 *   run: pnpm build
 *   env:
 *     REPO_NAME: ${{ github.event.repository.name }}
 *     PR_NUMBER: ${{ github.event.pull_request.number }}
 *
 * @returns {string} The path to the project directory from the domain root if working in a GitHub CI environment. If not, returns `/`.
 */
export function getProjectRoot () {
  let projectRoot = `/`

  if (!env.CI) return projectRoot

  projectRoot = `${projectRoot}${env.REPO_NAME}/`

  if (!env.PR_NUMBER) return projectRoot

  projectRoot = `${projectRoot}${env.PR_NUMBER}/`

  return projectRoot
}
