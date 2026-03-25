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

At the time, there were only a few options available, such as Rancher. However, these solutions were limited by their difficult configuration and required significant effort from the team to implement and maintain, especially since they were self-hosted.

## Evaluating SaaS Solutions

Other options we considered included adopting SaaS (Software as a Service) platforms that address these challenges. These solutions require no maintenance from our side and typically come with a support contract, ensuring the platform is maintained and providing assistance for any issues or questions that arise during both implementation and operation.

SaaS offerings in this space are often very comprehensive, significantly reducing operational costs in terms of time and internal resources. However, they also introduce a non-negligible additional cost to the organization's annual budget. The trade-off is between lowering the operational burden and increasing the financial investment required for the platform.

## Building an Internal Developer Platform in a New Organization

Later, when I moved to a different organization—almost the opposite of the previous one—I encountered the same challenge of managing applications within Kubernetes clusters.

However, this time the context was different: it was a smaller organization with a limited budget. Proposing an investment in a SaaS solution was difficult, if not impossible, but there was still a clear need for a tool that could solve these problems in a simple, cost-effective, and valuable way.

With the rise of AI and powerful development agents, I was inspired to replicate the SaaS model I had implemented in my previous company, but by building an internal development platform tailored to our needs. The idea was to create a product for our developers that directly addressed their daily pain points, with a product vision focused on my internal clients—the developers in my organization.

I began developing this internal platform based on the needs of my team and, most importantly, the needs of the developers themselves.
