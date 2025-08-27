# LangChain Notes

LangChain is a **framework** designed to build applications powered by
**Large Language Models (LLMs)** like GPT, Gemini, Claude, etc.\
It helps in connecting LLMs with **tools, memory, databases, and APIs**
to create advanced AI-driven apps.

------------------------------------------------------------------------

## 🔑 Core Features

### 1. Prompt Templates

-   Predefined and dynamic prompts.
-   Example: Take user input and auto-fit into a structured LLM prompt.

### 2. Chains

-   Sequence of steps (prompt → LLM → output → next tool).
-   Allows multiple LLM calls connected together.

### 3. Agents

-   LLM decides which tool to use (e.g., calculator, search engine,
    database).

### 4. Memory

-   Adds memory to LLMs (conversation, session, vector DB memory).

### 5. Integrations

-   Works with Databases (MongoDB, Pinecone, FAISS) and frameworks
    (Flask, FastAPI, React).

------------------------------------------------------------------------

## ⚙️ Example (Simple LangChain with OpenAI)

``` python
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

# Model
llm = ChatOpenAI(model="gpt-3.5-turbo")

# Prompt Template
prompt = ChatPromptTemplate.from_template("Translate this sentence into Hindi: {sentence}")

# Chain
chain = LLMChain(llm=llm, prompt=prompt)

# Run
print(chain.run("I love programming."))
```

**Output:**\
`मुझे प्रोग्रामिंग से प्यार है।`

------------------------------------------------------------------------

## 🔥 Use Cases

-   Chatbots (memory + tools)
-   Retrieval Augmented Generation (RAG)
-   Customer Support AI
-   Code Assistants
-   Business automation (CRM, ERP integrations)

------------------------------------------------------------------------

## 📌 Summary

LangChain is powerful for building **LLM-driven apps** with context,
tools, and integrations.\
It is best suited for **chatbots, automation, and RAG systems**.
