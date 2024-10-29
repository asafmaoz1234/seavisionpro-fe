# SeaVisionPro Frontend

This repository contains the frontend code for the website [SeaVisionPro.com](https://seavisionpro.com). SeaVisionPro provides the latest underwater sea visibility conditions, helping users plan their diving and snorkeling activities. The website was built using **HTML**, **CSS**, and **JavaScript**.


## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Design and Development Workflow](#design-and-development-workflow)
- [Deployment](#deployment)
- [Local Setup](#local-setup)
- [Contributing](#contributing)
- [License](#license)

## Overview

SeaVisionPro offers updated predictions for underwater visibility across four regions, with conditions rated as great, medium, or poor. The data is updated daily and is completely free for users to access.

## Process Flow
Sending a Request to AWS API Gateway and Fetching Results from AWS DynamoDB

1. Client Request:
The client (browser) sends an HTTP GET request to the AWS API Gateway endpoint. 

2. API Gateway:  
AWS API Gateway receives the request and processes it according to the defined API method and resource.
API Gateway fetches the latest visibility algorithm results from aws DynamoDB.

## Tech Stack

- **HTML**
- **CSS**
- **JavaScript**

The website was generated and designed with the following tools:

- **Relume** for sitemap creation.
- **Figma** for UI design.
- **Webflow** for converting designs into frontend code.

The website is hosted and deployed using **AWS Amplify**.

## Design and Development Workflow

1. **Sitemap Creation:**  
   The sitemap for the website was generated using **Relume** AI builder.

2. **Design Phase:**  
   UI/UX design was created in **Figma**, where the website's layout, color scheme, and fonts were decided based on the ocean and underwater theme.

3. **Development:**  
   After finalizing the design, **Webflow** was used to convert the design into HTML, CSS, and JavaScript code. The resulting code was optimized and modified as needed.

4. **Deployment:**  
   The website is hosted on **AWS S3** as a static site, with **AWS CloudFront** used as a CDN for global content delivery. Deployment is automated through a custom **GitHub Action**.

## Deployment

**GitHub Action** configured to:

1. Push any changes to the S3 bucket hosting the static website.
2. Invalidate the CloudFront cache to ensure updates are reflected globally.

### Deployment Workflow:

- **Continuous Deployment**: Changes pushed to the `main` branch trigger the custom GitHub Action.
- **S3 Sync**: The GitHub Action identifies modified files and pushes them to the S3 bucket.
- **CDN Invalidation**: After syncing with S3, the CloudFront cache is invalidated to ensure new content is served to users.

This setup enables efficient, low-maintenance deployment, ensuring all changes are live immediately after merging or pushing to the `main` branch.

## Local Setup

To run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/seavisionpro-frontend.git

