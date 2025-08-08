# Unit 3 Capstone: Building an Intelligent Document Search Pipeline

### Project Overview

In this capstone, you'll design and build a real-world intelligent document search system using AWS. Your pipeline will automate document ingestion, ETL, vectorization, structured data storage, and setup for future Retrieval-Augmented Generation (RAG) workflows.

**You'll deliver a working pipeline that processes both unstructured (PDF) and structured (CSV, JSON) files, making them searchable and ready for analytics.**

---

## Step 1: Review Your Materials

- **Understand your reference architecture** and data flow (diagram will be provided in class).

- Review AWS service documentation and code/lab samples provided in the course.

## Step 2: Build the Required AWS Data Flow & Infrastructure

#### **Must-Have Features:**

- **Central Storage:**
  - Use **S3** as the main repository for all incoming documents (PDFs, CSVs, JSON).

- **Automated Ingestion & Processing:**
  - Uploads to S3 automatically trigger **AWS Lambda** functions.

  - For PDFs: Lambda uses **Amazon Textract** to extract text, intelligently chunks the text (500-1000 tokens), and generates embeddings via **Amazon Bedrock's Llama models**.

  - Store raw extracted text in **AWS RDS** for structured querying.

  - Store vector embeddings in **OpenSearch** for semantic search.

- **ETL for Structured Data:**
  - Use **AWS Glue Crawler** to automatically catalog and discover schemas in all ingested files.

  - Use **AWS Glue Transform** to run ETL jobs for:
    - Data normalization

    - Schema validation

    - Systematic loading of CSV/JSON into **Redshift** tables

    - Populate Redshift with both structured data and vector embeddings

- **Unified Data Warehouse:**
  - **AWS Redshift** acts as your consolidated warehouse for SQL-queryable data and vector embeddings.

- **Visualization & BI:**
  - Connect **AWS QuickSight** to Redshift to build analytics dashboards.

- **Automation, Security & Control:**
  - Use **Lambda** for workflow automation and event handling.

  - Use **BOTO3** for scripting and programmatic control.

  - Apply **IAM** best practices for security and permissions.

## Step 3: Test and Document

- Test your pipeline end-to-end by uploading PDFs and structured files and validating data flow to RDS, OpenSearch, and Redshift.

- Document your architecture, how each service is used, and how to test or extend the pipeline.

---

## Must-Have Checklist

> 🥉 Bronze - complete all must-haves

- S3 stores raw PDFs, CSVs, and JSONs

- Lambda triggers on upload; calls Textract for PDFs

- Textract extracts and chunks PDF text

- Bedrock Llama generates document embeddings

- Raw text stored in RDS; embeddings in OpenSearch

- Glue Crawler catalogs and discovers data schemas

- Glue ETL normalizes, validates, and loads CSV/JSON into Redshift

- Redshift consolidates structured and vector data

- QuickSight dashboards visualize Redshift data

- Lambda and BOTO3 automate flows

- IAM secures resources

## Stretch Goals

> 🥈 Silver - complete 1 stretch goal <br> 🥇 Gold - complete all 3

**Push further by adding intelligence and unified user experience:**

- **Hybrid Query Interface:**
  - Build a single API or UI where users can:
    - Use semantic search (OpenSearch) for qualitative questions ("Explain our company policies").

    - Use direct SQL queries (Redshift) for quantitative analysis ("Show Q3 sales by region").

- **Intelligence Layer:**
  - Integrate **Amazon Bedrock LLM** for:
    - Natural language to SQL translation

    - Contextual response generation

    - Smart routing: automatically decide if a question requires vector search or SQL

- **Enterprise Knowledge API:**
  - Deliver unified endpoints that blend document retrieval with structured data insights, enabling users to query both with natural language.

## Tips for Success

- **Work in stages:** Build one piece, test it, then connect it to the next.

- **Automate everything:** Use Lambda, Glue, and BOTO3 to keep manual steps to a minimum.

- **Focus on clarity:** Comment your code and document every architectural choice.

- **Ask for help:** Don't spend too long blocked!
