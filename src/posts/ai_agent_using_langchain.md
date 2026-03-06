---
title: AI Agent using Langchain
description: This post describes and documents my learning of the Langchain framework and how I applied it to create a useful agent for a computer sales business based on my experience.
date: 2026-03-06
tags: ai,langchain,python,ollama
---

## Brief story about how I decided to create this AI Agent.

When I decided to invest in my hobby, I set out to buy a gaming PC. I do not know much about hardware, so I spent some time researching before making a decision. I compared different prebuilt options and focused on the best value for money: maximum performance at the lowest possible price.

After a while, I found one I liked. It could run all the games I wanted at maximum settings, and while it was not cheap, it was still within my budget.

On the day of the purchase, I went to the store and asked about that specific machine. The salesperson told me, "I can build you a better PC than this one, with better components, full compatibility, and room for future upgrades." With the same budget, he put together a better build and explained each change and why it was an improvement.

In the end, for almost the same price, I got a better result. It was a great experience.

This experience motivated me to design the following AI Agent.

## Why Langchain?

I discovered Langchain through a job posting on LinkedIn. The position was for an AI Architect at an international company based in Uruguay. This inspired me to learn more about the framework.

First, I needed to learn what Langchain is, how to use it, and become familiar with the tool. To achieve this, I took the following Udemy course: [LangChain - Develop AI Agents with LangChain & LangGraph](https://www.udemy.com/course/langchain/).


As I was taking the course, I remembered the story I shared earlier and realized that it would be possible to create an AI agent to recommend the best PC for a user's budget, based on the components sold by a company. The idea was to build an agent that could access the company's available stock and, using the user's input, suggest the optimal PC configuration. It would consider the budget, component compatibility, intended use (such as gaming based on specific games, work, video editing, running LLM models), and user preferences (like Intel or AMD).

This could make it much easier for users to have the same positive experience I had when I went to buy my PC and ended up with a better one than I originally planned.

The agent would rely on the store's available information, recommending only from in-stock components and avoiding "hallucinating" parts that don't exist or are unavailable. It would also assemble a PC within the user's budget and suggest better options if the budget is increased.

This idea gave me hands-on experience building an AI agent and showed me how careful and precise you need to be when creating an app that reasons with an LLM model. We all know how good these models are at making things up! I also learned about open-source options for running local models with Ollama, and how important it will be in the future to manage token costs effectively with enterprise models like OpenAI and Anthropic.

## Generic AI Agent Thinking loop 

![imagen](/images/ai-agent.png)

### Agent Loop Description (Step by Step)

This diagram represents the classic AI agent loop, commonly used in LangChain-based architectures:

1. **User Question**
   - The process starts when the user sends a question or request.
   - This input defines the goal the agent needs to solve.

2. **Thought (Reasoning)**
   - The agent analyzes the request and decides the best next step.
   - At this stage, it determines whether it can answer directly or needs to use a tool.

3. **Action (Tool Execution)**
   - If information is missing, the agent sends an input to a tool (search, API, database, calculator, etc.).
   - The tool executes a specific task and returns an output.

4. **Observation (Result Interpretation)**
   - The agent evaluates the tool output to determine whether it now has enough evidence.
   - This observation becomes new context for the next cycle.

5. **Back to Thought**
   - With the new observation, the agent reasons again.
   - It can take two paths:
     - execute another action (if more information is needed), or
     - close the loop if the answer has been found.

6. **Final Answer**
   - Once the agent has enough consistent information, it ends the cycle.
   - It then returns a clear answer aligned with the original question and grounded in the gathered observations.

In summary: **Thought -> Action -> Observation -> Thought ... -> Final Answer**.

## About the PC Builder Agent

The PC Builder Agent is designed to recommend PC builds based on a real product catalog, ensuring that only available components are suggested and avoiding hallucinations (invented products). The architecture is simple, modular, and extensible.

[Proyect Github Link](https://github.com/SalvadorOlivar/langchain-pc-builder)

### Main Objectives

- Recommend components **only** if they exist in the catalog
- Avoid hallucinations (do not invent products)
- Maintain a simple, modular, and extensible architecture

### Technologies Used
This project was built using the following technologies:

- **Python**: Used as the main programming language for building the AI agent and backend logic.
- **LangChain**: Framework for developing AI agents and managing LLM workflows.
- **Ollama**: For running local large language models during development and testing.

### Key Features

- Deterministic component selection (does not rely on the LLM to choose parts)
- Availability filters: only `stock > 0`
- Output includes business data: `SKU`, `price_usd`, `stock`, `region`
- User restrictions supported:
  - Preference for NVIDIA GPUs
  - Exclusion of AMD CPUs
- Budget is considered during selection
- Decoupled code by layers (`domain`, `services`, `tools`, `api`)

### Project Structure

```
pc/
├─ main.py
├─ pyproject.toml
├─ README.md
└─ pc_agent/
	├─ __init__.py
	├─ app.py
	├─ config.py
	├─ api/
	│  ├─ __init__.py
	│  └─ cli.py
	├─ domain/
	│  ├─ __init__.py
	│  ├─ catalog.py
	│  ├─ models.py
	│  └─ parser.py
	├─ services/
	│  ├─ __init__.py
	│  ├─ recommender.py
	│  └─ renderer.py
	└─ tools/
		├─ __init__.py
		└─ catalog_tools.py
```

### Layered Architecture

1. **domain/** (pure business rules)
	- `catalog.py`: Defines the local catalog (`CATALOG`), required categories, and selection priority. Source of truth for component availability.
	- `models.py`: Domain data models (`UserRequest`).
	- `parser.py`: Converts user free text into a domain structure. Extracts budget and main restrictions.
	- Rule: `domain` does not depend on CLI or presentation.

2. **tools/** (LangChain Tool-like interfaces)
	- `catalog_tools.py`: 
	  - `search_catalog(...)`: Text search in catalog.
	  - `get_available_components(...)`: Components by category/region/price. Both tools filter by stock and region.
	- Relation: tools read from the `domain` catalog.

3. **services/** (business orchestration)
	- `recommender.py`: Core build selection logic. Applies user restrictions and budget. Returns `BuildResult` with selected parts, missing categories, and total.
	- `renderer.py`: Converts recommender result into CLI-friendly output. Includes budget alerts and anti-hallucination guarantee.
	- Relation: `services` consume `domain` + `tools`, but do not depend on `api`.

4. **api/** (entrypoints)
	- `api/cli.py`: CLI entrypoint, executable as a module (`python -m pc_agent.api.cli`).

5. **app.py** (composition root)
	- Loads configuration and environment variables.
	- Builds the end-to-end flow: parse user input, select build, render response.

6. **main.py** (minimal wrapper)
	- Simple entrypoint for compatibility. Delegates to `pc_agent.app.main`.

### Execution Flow

1. `main.py` calls `pc_agent.app.main()`
2. `app.run()` gets `USER_INFORMATION` (or uses default value)
3. `domain.parser.parse_user_information()` creates a `UserRequest`
4. `services.recommender.select_build()`:
	- Requests component pools by category
	- Applies restrictions (NVIDIA / no AMD)
	- Selects components prioritizing performance within budget
5. `services.renderer.render_recommendation()` generates the final output

**Result:**
- The final response always uses existing SKUs from the catalog.

### Anti-Hallucination Guarantee

The current design avoids recommending invented components because:
- Selection is deterministic over the `CATALOG`
- Each category uses existing, in-stock items
- Output is generated from the final selection (not from LLM free text)

### Configuration

Relevant variables:
- `USER_INFORMATION`: Text with user requirements (e.g., `Budget: $1500`).
- If `USER_INFORMATION` does not exist, a default example from `config.py` is used.

### Running the Agent

**Main entrypoint**

```bash
uv run main.py
```

### Development and Extension

- **Add new components:** Edit `pc_agent/domain/catalog.py` and add an item with at least: `name`, `category`, `brand`, `sku`, `price_usd`, `stock`, `region`.
- **Change selection rules:** Edit `pc_agent/services/recommender.py` for category priority, budget optimization, or new business rules.
- **Change output format:** Edit `pc_agent/services/renderer.py`.
- **Integrate real catalog (DB/API):** Create a repository in `adapters/` (e.g., `catalog_repository.py`), replace direct access to `CATALOG` with this repository, and keep the `tools` and `services` interfaces stable.

### Main Dependencies

- `langchain-core`: Tool definitions
- `langchain` / `langchain-ollama`: Available to integrate agent/LLM layer
- `python-dotenv`: Loads environment variables

### Current Limitations

- Compatibility is basic by category/restriction (does not deeply validate socket/chipset)
- In-memory catalog (Python file), not persistent
- Simple text parser (regex); does not cover all possible formats

### Suggested Next Steps

- Add unit tests for `parser`, `recommender`, and `tools`
- Add real compatibility validations (socket, PSU power, case/GPU size)
- Migrate catalog to a database/API
- Expose HTTP endpoint (FastAPI) in addition to CLI
