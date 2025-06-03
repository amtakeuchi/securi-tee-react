---
title: 📡 Cybersecurity & Financial Threat Intelligence Aggregator (Flask Web App)
date: 2025-06-02T12:00:00.000Z
thumbnail: /images/uploads/cleancyberthreatfeedss.jpg
---
This is a custom-built Flask application I designed to scrape and collect the latest headlines and alerts from across the world news ecosystems. It runs in browser, locally, and compiles cybersecurity, finance, cryptocurrency, geopolitics, crime, and other world news headlines and articles into one easily readable, centralized dashboard for incident response, penetration testing, cloud infrastructure security, and strategic risk monitoring purposes. \
\
Reason being? Well, as someone diving deeper into cybersecurity operations and cloud infrastructure security, I kept running into the same issue: information overload and wasted time. Between all of my news feeds, industry blogs, and sites like Bloomberg, staying current on relevant threats, incidents, and financial trends was becoming a chore and a drain with all the jumping around. I needed a way to cut through the noise and bring to the surface the most actionable, security-relevant headlines to me, and FAST. \
\
Problem? I didn't have an application to do this for me. So I built it. \
\
**🛠️ The Idea**

I wanted a singular dashboard that could pull news and alerts from multiple trusted sources — cybersecurity sites, financial publications, crime bulletins, and world news — then allow me to filter them by keywords or titles relevant to me. Think APT alerts, ransomware incidents, critical vulnerabilities, market-moving crypto crime stories, and geopolitical conflicts with cyber risk implications.

This Flask web app combines

* Trusted sources like BleepingComputer, Dark Reading, The Hacker News, Bloomberg World, and various Crypto sections
* RSS feed aggregation using feedparser
* Direct web scraping for sites like Bloomberg (which killed off public RSS feeds for several key sections)
* Asynchronous feed fetching with Python’s ThreadPoolExecutor to pull multiple feeds and scrapes in parallel, without blocking the server
* Keyword-based filtering
* Caching with Flask-Caching to improve performance and avoid hammering the same endpoints every few minutes

The result is a clean, lightweight web dashboard that shows me the latest threat intelligence and financial risk signals in near real-time, tailored for me.

**📊 Why This Matters**

In cybersecurity, timing is everything. Getting a zero-day disclosure, nation-state attribution, or critical infrastructure ransomware report even 30 minutes before your competitors can make all the difference in patching, escalation, or response prep. This tool helps me stay a step ahead without the noise.

Plus, integrating finance and world news lets me track how other large events might ripple into the cloud and enterprise tech spaces. A geopolitical conflict in a region hosting major data centers? A regulatory crackdown on a crypto exchange? This dashboard lets me know and read all about it.

**🚀 What’s Next**

Somewhere down the line I’m planning to enhance it with/by

* A search and sort feature for articles to narrow down by keyword or category even more
* Optional email or webhook alerts
* Dockerizing the app for cloud deployment
* Potentially building a simple mobile-friendly front end so I can check alerts on the go

It’s already become a core part of my workflow and one of the most useful personal tools I’ve built so far.

Check it out for yourself below!

[View the source on GitHub](https://github.com/amtakeuchi/portfolio/tree/main/cyber_newsfeed_web)
