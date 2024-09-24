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
   The frontend code is hosted on **AWS Amplify**, providing CI/CD pipelines and automatic deployment from the repository.

## Deployment

The website is automatically deployed using **AWS Amplify**. Any new commits to the `main` branch trigger an automatic build and deploy process.

### AWS Amplify Features:

- **Continuous Deployment:** Automatically build and deploy changes from the `main` branch.
- **Hosting:** The site is hosted using AWS Amplify for low-latency and global availability.

## Local Setup

To run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/seavisionpro-frontend.git

