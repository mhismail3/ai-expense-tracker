# PBI-6 Deploy + E2E CoS PRD

## 1. Summary
Deploy application to Vercel with CI and implement end-to-end Conditions of Satisfaction test.

## 2. Problem
Need reliable deployment pipeline with automated tests.

## 3. Proposed Solution
GitHub Actions runs unit and integration tests, then deploys to Vercel. E2E test runs after deploy hitting preview URL.

## 4. User Stories
- As a developer I merge to main and get automatic deploy

## 5. Requirements
- `Dockerfile` and `vercel.json`
- GitHub Actions workflow
- E2E test file covering sign-up, logging, query

## 6. Non-Requirements
- Multi-environment deploys

## 7. Data Schema
- No new schema

## 8. Test Strategy
- Unit & integration from other PBIs
- E2E: full flow hitting API routes

## 9. Acceptance Criteria
- Successful CI + deploy with E2E passing
