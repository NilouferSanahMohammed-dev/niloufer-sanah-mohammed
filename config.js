/**
 * config.js
 * ---------
 * The project list on this site isn't hand-maintained, it's fetched
 * live from the GitHub API every time the page loads (see script.js).
 * Push a new public repo to GitHub and it shows up here on its own,
 * no code change needed.
 *
 * This file is the only manual part: which repos to leave out of the
 * list (this portfolio's own repo, and anything else not meant to be
 * a public project card), and which one gets the bigger "flagship"
 * card. Both are just repo names, nothing else needs to change here
 * when a new project gets added.
 */

const GITHUB_USERNAME = "NilouferSanahMohammed-dev";

const HIDDEN_REPOS = ["niloufer-sanah-mohammed", "sanah-blog"];

const FLAGSHIP_REPO = "jarvis";
