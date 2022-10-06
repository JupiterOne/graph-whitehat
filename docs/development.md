# Development

This integration focuses on [Whitehat](https://www.whitehatsec.com/) and is
using the
[WhiteHat Security API Suite](https://apidocs.whitehatsec.com/whs/docs/whitehat-security-api-portfolio)
for interacting with Whitehat resources.

## Provider account setup

To obtain the API token for a Whitehat account, sign in to Sentinel. Click the
"My Profile" button in the top right and then "API Key". Enter the account
password and copy the displayed API Key.

## Authentication

Provide the `API_KEY` that you generated for the account to the `.env`. You can
use [`.env.example`](../.env.example) as a reference.
