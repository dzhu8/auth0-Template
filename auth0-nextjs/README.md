This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Set up your Auth0 App
You can choose to do this automatically by running a CLI command (requires the Auth0 Command Line Interface tool to be installed) or do it manually via the auth0 website dashboard. It's easier to do it via the dashboard:

### via Dashboard: 
Note that this requires signing up on the [Auth0](https://www.auth0.com) website and creating a project. 

Create a .env.local file with these variables:
```
AUTH0_DOMAIN=YOUR_AUTH0_APP_DOMAIN
AUTH0_CLIENT_ID=YOUR_AUTH0_APP_CLIENT_ID
AUTH0_CLIENT_SECRET=YOUR_AUTH0_APP_CLIENT_SECRET
AUTH0_SECRET=YOUR_LONG_RANDOM_SECRET_HERE
APP_BASE_URL=http://localhost:3000
```

You should get `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET` from the project page; click on "Applications" --> your app name --> "Settings". For `AUTH0_SECRET`, use a command to generate a UUID:

* For Mac/Linux, `openssl rand -hex 64`.
* For Windows, 
`$bytes = New-Object byte[] 16
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[System.BitConverter]::ToString($bytes).Replace('-','')`, where each byte = 2 characters (here, '16' is the stand-in for the byte count). 

### via CLI on Mac:
```
AUTH0_APP_NAME="My App" && brew tap auth0/auth0-cli && brew install auth0 && auth0 login --no-input && auth0 apps create -n "${AUTH0_APP_NAME}" -t regular -c http://localhost:3000/auth/callback -l http://localhost:3000 -o http://localhost:3000 --reveal-secrets --json > auth0-app-details.json && CLIENT_ID=$(jq -r '.client_id' auth0-app-details.json) && CLIENT_SECRET=$(jq -r '.client_secret' auth0-app-details.json) && DOMAIN=$(auth0 tenants list --json | jq -r '.[] | select(.active == true) | .name') && SECRET=$(openssl rand -hex 32) && echo "AUTH0_DOMAIN=${DOMAIN}" > .env.local && echo "AUTH0_CLIENT_ID=${CLIENT_ID}" >> .env.local && echo "AUTH0_CLIENT_SECRET=${CLIENT_SECRET}" >> .env.local && echo "AUTH0_SECRET=${SECRET}" >> .env.local && echo "APP_BASE_URL=http://localhost:3000" >> .env.local && rm auth0-app-details.json && echo ".env.local file created with your Auth0 details:" && cat .env.local
```

## via CLI on Windows: 
```
$AppName = "My App"; winget install Auth0.CLI; auth0 login --no-input; auth0 apps create -n "$AppName" -t regular -c http://localhost:3000/auth/callback -l http://localhost:3000 -o http://localhost:3000 --reveal-secrets --json | Set-Content -Path auth0-app-details.json; $ClientId = (Get-Content -Raw auth0-app-details.json | ConvertFrom-Json).client_id; $ClientSecret = (Get-Content -Raw auth0-app-details.json | ConvertFrom-Json).client_secret; $Domain = (auth0 tenants list --json | ConvertFrom-Json | Where-Object { $_.active -eq $true }).name; $Secret = [System.Convert]::ToHexString([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32)).ToLower(); Set-Content -Path .env.local -Value "AUTH0_DOMAIN=$Domain"; Add-Content -Path .env.local -Value "AUTH0_CLIENT_ID=$ClientId"; Add-Content -Path .env.local -Value "AUTH0_CLIENT_SECRET=$ClientSecret"; Add-Content -Path .env.local -Value "AUTH0_SECRET=$Secret"; Add-Content -Path .env.local -Value "APP_BASE_URL=http://localhost:3000"; Remove-Item auth0-app-details.json; Write-Output ".env.local file created with your Auth0 details:"; Get-Content .env.local
```

Note that this template uses Auth0-style branding (see `globals.css`) instead of the Next.js default. 
