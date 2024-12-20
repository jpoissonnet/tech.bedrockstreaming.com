---
layout: ../../../../../layouts/post.astro
title: QCon London 2024
description: A few notes and ideas, coming back from this QCon conference at London.
author: [c_petit, j_foray, v_gallissot]
tags: [cloud, devops, conference, 2024]
color: rgb(251,87,66)
thumbnail: "./2024-04-09-Qcon-London-arrival.jpg"
---

We really enjoyed this [QCon conference in London](https://qconlondon.com/). It's based on 5 tracks a day, covering resilience, scalability, architecture, monitoring, performance, management and all the subjects that speak to tech companies. None of these tracks are sponsored: they're all about feedback, with no marketing whatsoever. There is a 6th track where sponsorship is permitted, and it's the only one. There aren't many sponsorship stands, and you go to this conference to talk to your peers first and foremost.

We were able to focus on feedback from teams facing similar problems to those we face at Bedrock Streaming. It was an inspiring conference, which reinforced some of our choices and gave us ideas for others.

This article will summarise what we have learned from each theme.


## Performance

Not all optimisations are necessarily relevant, and it is important to measure their benefits and compare their costs. Some make the code more complex, while others lead to weaknesses in resilience. It's all about compromise.

Think about the main case, rather than anticipating all the possible exceptions, which can complicate the use in very isolated cases.

Profiling is the key to your journey to optimization. However with one tool you are sure where problems lie but with a second one (or more) doubt creeps in… It is interesting to associate benchmarks before and after each optimization. And beware as the famous Pareto Principle,-aka the 80-20 rule-, as it turns out easy fixes are often the most efficient.

You can’t perform profiling? No problem just follow metrics and identify when a code change impacts your performances. What again? I can’t hear you with all this noisy data! Oh yes you are right, noise in your data is indeed a pain in the backend but you have to deal with it as it is commonplace. I know, this is scary, because you don’t come from a data engineering world but not worries, statistics are not so hard to tame. Go take a look at [Change Point Detection](https://en.wikipedia.org/wiki/Change_detection), a non-parametric test which helps you test if these changes you saw in your metrics are relevant.

Let’s now deep-dive in a more opaque layer of our system composed by the kernel. Here we have to admit that the heuristics at stake while for example choosing on which CPUs or GPUs to execute are not easily tweakables, despite the fact that it was shown they indeed impact overall performances. 

One of the promising solutions is the famous tool cilium/eBPF which allows you to directly reprogram certain behaviours of your kernel, especially the network (for the cilium part), without having to recompile the kernel.

However, some think that regarding these kernel issues we are stuck in a local maximum and it will require a mindset shift to fully overcome these hardware performance issues.


## Scaling

Around scaling, we attended both technical and organisational talks.
On the technical side, there are a number of relevant ideas. Always contain your costs - especially in the Cloud, with all its hidden expenses. Aiming for the highest possible SLO is a higher priority than cutting costs.

Some incidents are an accumulation of many changes and are not linked to one team/one change/one regression. Those problems lead to long investigations and cannot be resolved by a simple rollback. This counterpart comes naturally with innovation.

Architects or equivalent must always coordinate internal exchanges: timeout durations, number and relevance of retries, etc.

Also, standardising tools brings more benefits than choosing a highly optimised tool that is different for each team. Try to reuse code and don’t reinvent the wheel.

Several presenters spoke of asynchronous and 'real-time' scalability (meaning millions of users in a matter of seconds). The bottom line for all of them is that there is no way of scaling the necessary resources so quickly: everyone pre-scales. The pre-scaling itself can take a long time, so for a particular event (such as a sports match), resources need to be launched several hours in advance. Asynchronous processing can help to spread out all the non-critical calculations over time.

Don’t forget to be patient! It really seems to go against the tide, yet designing long-time running APIs (meaning APIs that can handle waiting) really seems to be the key of success when trying to address scalability issues. Likewise try as much as possible not to overlap your APIs field of expertise.

On the organisational level, architects of all kinds must identify or create links between all elements in the ecosystem.

The architect's vision is to understand the choices and make compromises between the teams so that the whole is coherent. There is no lock-in. Every choice brings both positives and negatives.


## Sustainability

Including sustainability in our business processes is a recent but no less important necessity. And do you know what? As it turns out, it often means cutting costs, increasing performances and resiliency! 

![What makes software green?](2024-04-10-what-makes-software-green.jpg)

What we can sum up is that we have the power to act at our own level. Choose services that auto-scale, prefer ARM instances, select partners who measure and try to improve their Carbon emissions. In many cases, Serverless or Compute@Edge can be a very good choice for applications that can take huge load spikes as much as a few requests (quickly scalable and extremely elastic). When possible, try to run jobs during the night, when load spikes are over.

The aim is to use energy when it is really needed: switching off dev and staging environments when employees are resting. Limit over-provisioning of resources and pre-scaling times.
All cloud providers include a sustainability section in their 'well-architected' programs, a section that is independent of performance and costs, even though it provides co-benefits with those two subjects.

It really is in companies' interests to move in this direction.


## Management, People and  Process

Maybe first keep in mind that decisions are not right or bad, they just are taken by a person or a quorum based on the context they had on a given time. And let’s face it, your organisation will need to change over time especially if you begin as a start-up and now need to scale-up (oh an interesting topic of scaling coming back!).

As for scaling your infrastructure, you need to realise that you will need to make compromises. For example, Trainline shared with us that their three pillars are: Alignment, Productivity and Code Quality. You can't perform in the three at the same time, you need to choose which one(s) to let go a little in order to achieve the company's goal. Importantly what is working at a given time in a certain situation could not be appropriate anymore months later.


## Platform Engineering

The last day of the conference offered a dedicated track on platform engineering, where we listened to the insights shared by the speakers. As they delved into their own experiences and learnings, we found striking parallels with our own journey at Bedrock over the past few years.

![Lessons from Trainline](2024-04-09-Trainline-lessons.jpg)

One of the most resonant themes was the importance of treating the platform as a product: a perspective shift that has significantly influenced our approach. By emphasising the need for a smoother experience that balances consistency, performance, security, and development speed, the speakers reinforced the notion that our platform isn't just a set of tools; it's a crucial enabler for our developers' success.

The concept of providing a golden path for developers stood out as particularly impactful. We've come to realise that by streamlining the onboarding process and offering clear guidelines, we can empower developers to navigate the platform with confidence and efficiency. This approach not only accelerates time-to-market for new features but also fosters a sense of trust between the platform team and its users.

Another key takeaway was the importance of communication and trust-building within the organisation. We were reminded that trust is the currency of collaboration, and effective communication is essential for maintaining it. Clear documentation, transparent processes, and accessible points of contact were highlighted as critical components of this effort.

Surveys emerged as a valuable tool for gathering feedback and gauging user satisfaction, although the speakers acknowledged the challenges in ensuring high engagement and confidence in the results. However, they emphasised that even imperfect data can provide valuable insights when interpreted thoughtfully and supplemented with other forms of feedback, such as user interviews and proactive communication.

The speakers also shared their experiences with empowering developers to take ownership of certain tasks, such as fixing issues surfaced by conformity checks and contributing features that solved their own challenges back up to the general platform to benefit the whole organisation. This aligns closely with our own DevOps principles, emphasising collaboration and shared responsibility across teams.

As we reflect on the insights shared by the conference speakers, we're reminded of the importance of continuous improvement and iteration in our platform engineering efforts. By learning from our mistakes, embracing new perspectives, and staying attuned to the needs of our users, we can continue to evolve our platform into a truly indispensable resource for our development community.


## Conclusion

It was our first QCon for most of us. We appreciated the transparency of the speakers and the commitment of the organisers, who made the event a success on every level: the intensity of the conferences, the quality of the talks, the really good and varied food and the discreet presence of the sponsors.

Without being very technical, this conference is a source of inspiration for us, as it focuses on feedback and encourages discussion with our peers.

