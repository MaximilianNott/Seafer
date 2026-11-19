# Seafer

A rules-based regulatory assessment engine designed to help
Australian businesses understand foreign investment requirements
when entering the Vietnamese market.

## Overview

Seafer is an independent project exploring how complex regulatory
requirements can be translated into structured compliance
assessments.

The application uses a rules-based engine to evaluate business
characteristics against regulatory requirements and generate
risk-weighted compliance outputs.

## Key Features

- Dynamic assessment questionnaire based on business characteristics.
- Regulatory assessments covering foreign ownership, licensing,
  environmental requirements and sector-specific obligations.
- Risk-weighted compliance flags to identify relevant requirements.
- Baseline and sector-specific compliance pathways.
- Recommended next steps and regulatory dependencies.
- Automated PDF assessment reporting.

- ## System Architecture

The application uses a React frontend and a Node.js/Express backend.

The assessment engine follows a structured processing sequence:

1. Input normalisation
2. Regulatory flag generation
3. Flag evaluation
4. Risk calculation
5. Next-step generation
6. Response formatting

## Technology Stack

- JavaScript
- Node.js
- Express
- React
- Vite
- PDFKit
- n8n
- Gumloop

## Project Scope and Limitations

Seafer is an exploratory regulatory assessment tool, not a substitute
for professional legal advice.

The system models defined regulatory requirements and rules. It does
not account for every aspect of regulatory interpretation, including
administrative discretion, provincial variations, processing delays
or informal practices.

Regulatory outputs require human review and verification.

## Project Status

Independent project/prototype.

## Author

Maximilian Nott
