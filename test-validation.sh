#!/bin/bash

# Script to test Strapi validation issue with draft content

echo "======================================================"
echo "Strapi Draft Content Validation Issue Test"
echo "======================================================"
echo ""
echo "This script will test for the issue where Strapi allows"
echo "saving draft content with missing required fields."
echo ""
echo "PREREQUISITES:"
echo "1. Strapi server is running at http://localhost:1337"
echo "2. You have created an Article with empty required fields as a draft"
echo ""

# Run GraphQL test
echo "======================================================"
echo "Testing with GraphQL..."
echo "======================================================"

echo "Fetching all draft articles with GraphQL:"
curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"query": "query { articles(status: DRAFT) { documentId title content author publishedAt } }"}' \
    "http://localhost:1337/graphql" | jq

echo ""
echo "======================================================"
echo "Test completed!"
echo "======================================================"
echo ""
echo "If you saw error messages when fetching draft content,"
echo "the issue is confirmed - Strapi allowed saving content"
echo "with missing required fields, but errors occurred when"
echo "trying to fetch that content through the GraphQL API."
echo "" 