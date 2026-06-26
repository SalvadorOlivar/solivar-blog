---
title: Platform Engineer
description: This post describes and documents my learning of Platform Engineer,what is my experiencie doing platform enginner and how I solved this problems with differents companys that I worked on.
date: 2026-03-25
tags: platform-engineer, cloud, typescript, k8s
---
## My Experience with Platform Engineering

Throughout my career, I have encountered the challenges addressed by Platform Engineering in various organizations where I have worked. These challenges were solved in different ways, but the main approach was always the same: automate processes so that SRE/DevOps teams do not have to spend effort and time on repetitive tasks, allowing them to focus on activities that provide real value to the organization.

The goal was to reduce development times by providing tools that give developers autonomy, but in a controlled manner managed by the team responsible for maintaining the platform. For a long time, I considered this to be a separate concept, until I read the following blog post from the CNCF: [What is Platform Engineering?](https://www.cncf.io/blog/2025/11/19/what-is-platform-engineering/).

This was something I was already implementing, thanks to the vision of the architects and service owners I worked with as an SRE. However, I never called it Platform Engineering until I read this blog post and realized that the practices I was following had a name and a growing community behind them.

## Tools Used and Challenges Faced

During this journey, several tools were essential to achieve the goals of Platform Engineering. Automation platforms, CI/CD pipelines, infrastructure-as-code tools, and cloud-native technologies like Kubernetes played a central role.

One recurring challenge was managing access to Kubernetes clusters. In my experience, developers should not need to understand Kubernetes internals to do their job effectively. My main responsibility was to automate as many processes as possible so that developers could focus on what brings them the most satisfaction: closing tickets and delivering features for their applications. Everything else should be automated or provided through a user-friendly and intuitive graphical interface, minimizing the cognitive load required from developers.

If there are developers with more experience in these areas, ideally, they should have limited permissions to perform actions in the clusters. The goal is to divide responsibilities based on each team's area of expertise, ensuring security and operational efficiency.

When certain tasks can be delegated to developers, they must be done in a secure and controlled manner, always overseen by the expert team responsible for the platform.

With these well-defined problems, we were able to search for tools that could help us solve them.

## Evaluating SaaS Solutions

At the time, there were only a few options available, such as Rancher. However, these solutions were limited by their difficult configuration and required significant effort from the team to implement and maintain, especially since they were self-hosted.

Other options we considered included adopting SaaS (Software as a Service) platforms that address these challenges. These solutions require no maintenance from our side and typically come with a support contract, ensuring the platform is maintained and providing assistance for any issues or questions that arise during both implementation and operation.

SaaS offerings in this space are often very comprehensive, significantly reducing operational costs in terms of time and internal resources. However, they also introduce a non-negligible additional cost to the organization's annual budget. The trade-off is between lowering the operational burden and increasing the financial investment required for the platform.

## Building an Internal Developer Platform in a New Organization

Later, when I moved to a different organization—almost the opposite of the previous one—I encountered the same challenge of managing applications within Kubernetes clusters.

However, this time the context was different: it was a smaller organization with a limited budget. Proposing an investment in a SaaS solution was difficult, if not impossible, but there was still a clear need for a tool that could solve these problems in a simple, cost-effective, and valuable way.

With the rise of AI and powerful development agents, I was inspired to replicate the SaaS model I had implemented in my previous company, but by building an internal development platform tailored to our needs. The idea was to create a product for our developers that directly addressed their daily pain points, with a product vision focused on my internal clients—the developers in my organization.

I began developing this internal platform based on the needs of my team and, most importantly, the needs of the developers themselves.

## PoC doing Vibe Coding until works!
With the lessons from my previous company's platform fresh in mind, I began using Codex to build this new internal solution. My goal was to create something that ran natively on Kubernetes, starting with Next.js to prototype the initial release quickly. As the platform evolved, I gradually transitioned it toward a microservices architecture for better scalability and maintainability.

For data persistence, I used AWS RDS with PostgreSQL, and for authentication, I implemented Azure Entra ID app registrations to enable SSO—leveraging the identity infrastructure our organization already had in place.

Within about a week and after several iterations with Codex, I had successfully built a functional platform that exceeded my expectations. I was satisfied with both the progress and the solid foundation we had established.

## Platform Architecture

In my view, the platform's architecture is quite straightforward. It runs on an EKS cluster dedicated to internal tools for the organization, particularly the SRE team.

For each cluster we want to manage, we install a pod that acts as an agent. This agent handles synchronization between the clusters and the platform, as well as executing actions like restarting pods.

The platform also includes a microservice responsible for managing various entities, such as users, clusters, clients, and roles. This presented a challenge in terms of access control—for instance, ensuring that certain users can only view clusters for the clients they work with, while admins have full visibility and the ability to add new clusters to the platform.

All Kubernetes-related functionalities are handled by a separate microservice. This service performs actions within the cluster, communicates with the agents, and displays relevant Kubernetes information.

As I progressed, I added useful sub-features, such as centralized agent management, allowing updates to all clusters from a single location.

For user authentication, I created groups in Entra ID for each client and added the corresponding developers to those groups. They can then log in easily using their Microsoft email. This approach is very similar to Grafana's SSO, utilizing groups, assigning roles to those Entra ID groups, and then mapping those roles within the platform.

## Real world usage.
Once I was satisfied with the results, I shared the platform with colleagues who would undoubtedly find it incredibly useful. Without needing any Kubernetes expertise, they could access the clusters in a controlled way, eliminating the hassle of downloading cluster credentials locally into kubeconfig, using tools like OpenLens or K9S, or even kubectl.

This gave them clear visibility into their applications, transforming what had been a black box into something accessible and transparent.

For them, being able to see that a pod was running, check the app's environment variables, view CPU and memory charts, and access a dedicated logs section was more than enough—it significantly streamlined their development process.

## Improving the platform
Over the following months, and once we had a solid idea, I began working closely with developers to improve the platform.

Before adding new features, it was necessary to improve the repository structure—especially how the code was organized. Vibe coding delivers functional results fast, but without clear direction it tends to create brute-force solutions. As the platform evolved, this led to dead code, redundant pieces that were no longer used, and tests that ultimately did not add real value.

The first step was learning to work with a developer team. I found there are important differences between doing SRE work and developing software. When everyone is working on the same codebase, branch management becomes much more important, and communication is essential. The same may be true for Terraform code, but an application is much more complex in my opinion.

Development work is also more creative, so debating ideas around new functionality and driving platform improvement is about much more than just infrastructure. In infrastructure there are usually a few clear paths to follow, while in software development there are many more possibilities to explore.

Another important lesson I learned was that the more you understand the problem you are working on, the better the results you get when working with AI. Better knowledge allows you to give clearer instructions and better context to the AI, so it can do what it does best: write code. By this time, the artisanal part of software development was already being dominated by AgentAI, because what an experienced developer used to take weeks to do, AI could now do in a few hours.

So I started focusing even more on architecture, understanding how programming languages work with online courses from [Fernando Herrera, DevTalles](https://cursos.devtalles.com/) , design patterns, code architecture, and better ways to organize code such as Hexagonal Architecture. I began reading books on O’Reilly such as [Fundamentals of Software Architecture, 2nd Edition](https://learning.oreilly.com/library/view/fundamentals-of-software/9781098175504/), [Learning Domain-Driven Design](https://learning.oreilly.com/library/view/learning-domain-driven-design/9781098100124/), and [Fundamentals of Software Engineering](https://learning.oreilly.com/library/view/fundamentals-of-software/9781098143220/).

I’m going to write more about my journey toward software architecture in another post and expand on certain topics in future posts.

Working with other developers made my work exponentially better. It brought in experience, made the work more robust and complete, and created a sense within the team that what we were building was truly great.

In conclusion, this experience gave me a lot. It opened up a range of new possibilities for my career, renewed my enthusiasm for creating, and taught me things I did not know before.

