# Strapi Draft Validation Issue Reproduction

This project demonstrates an issue with Strapi's validation behavior where required fields are only validated when publishing content, not when saving as a draft. This causes problems when fetching draft content through the GraphQL API, as it may contain null values for required fields.

## The Issue

Strapi's current validation behavior:
- Only enforces validation rules (like required fields) when content is published
- Allows saving draft content with missing required fields
- Causes API errors when fetching draft content with missing required fields through GraphQL

## Steps to Reproduce

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the Strapi server:
   ```
   npm run develop
   ```
4. Create an admin account at http://localhost:1337/admin

5. Create a new Article in the admin panel:
   - Go to Content Manager → Articles
   - Click "Create new entry"
   - **Leave the required fields (title and content) empty**
   - Click "Save" (NOT "Save and publish")

6. Run the test script to check if the issue exists:
   ```
   ./test-validation.sh
   ```

## Expected vs. Actual Behavior

**Expected Behavior**:
- Validation should occur both on save and publish
- The API should prevent saving content that doesn't meet validation requirements
- GraphQL should return proper validation errors instead of internal errors

**Actual Behavior**:
- Validation only occurs on publish
- API allows saving invalid content as draft
- GraphQL returns errors when fetching draft content with null required fields

## Project Structure

- `src/api/article`: A content type with required fields:
  - `title` (required string)
  - `content` (required rich text)
  - `author` (optional string)
- `test-validation.sh`: Script that tests GraphQL to demonstrate the issue

## Impact

This issue affects:
- Content editors who expect immediate validation feedback
- API consumers who need to handle draft content through GraphQL
- System stability when dealing with draft content

## Proposed Solution

Implement validation checks both on save and publish operations, ensuring consistent validation behavior across all content states.
