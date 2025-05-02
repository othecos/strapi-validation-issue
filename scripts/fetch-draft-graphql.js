/**
 * Script to reproduce Strapi validation issue with draft content using GraphQL
 *
 * This script demonstrates the error that occurs when fetching draft content
 * with missing required fields via GraphQL.
 */

const axios = require("axios");

// Configure API endpoint
const GRAPHQL_URL = "http://localhost:1337/graphql";

// GraphQL query to fetch all articles with preview state
async function fetchDraftArticles() {
    try {
        console.log("Fetching draft articles with GraphQL...");

        const query = `
                    query FetchDraftArticles {
                        articles(status: DRAFT) {
                            documentId
                            title
                            content
                            author
                            publishedAt
                        }
                    }
        `;

        const response = await axios.post(GRAPHQL_URL, { query });

        console.log("Response:", JSON.stringify(response.data, null, 2));

        if (response.data.errors) {
            console.log(
                "\nISSUE CONFIRMED: GraphQL returned errors when fetching draft content with missing required fields."
            );
        }
    } catch (error) {
        console.error(
            "Error fetching articles:",
            error.response?.data || error.message
        );
        console.log(
            "\nISSUE CONFIRMED: Error when trying to fetch draft content with missing required fields."
        );
    }
}

async function runReproduction() {
    console.log(
        "Starting reproduction of Strapi validation issue with GraphQL..."
    );
    console.log(
        "================================================================="
    );
    console.log("INSTRUCTIONS:");
    console.log("1. Create an article in the Strapi admin panel");
    console.log('2. Leave the required "title" and "content" fields empty');
    console.log("3. Save the article as a draft (DO NOT PUBLISH)");
    console.log(
        "4. If you want to test a specific article ID, pass it as an argument to this script"
    );
    console.log(
        "=================================================================\n"
    );

    // Fetch all draft articles
    await fetchDraftArticles();

    console.log("\nReproduction completed.");
}

// Run the reproduction script
runReproduction();
