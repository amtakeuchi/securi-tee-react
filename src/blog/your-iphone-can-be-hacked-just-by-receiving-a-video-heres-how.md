---
title: Your iPhone Can Be Hacked Just by Receiving a Video - Here's How
date: 2025-05-28T22:11:00.000Z
thumbnail: /images/uploads/clean-iphone_custom_featuredimage_thu-may-29-2025.jpg
---
If you think your iPhone is safe as long as you avoid clicking suspicious links, think again. A newly discovered vulnerability (CVE-2025-31200) proves that even just receiving a media file could compromise your entire device, with no clicks required.

For the full technical breakdown, security researcher Billy Ellis has an excellent [video](https://www.youtube.com/watch?v=nTO3TRBW00E). But since my friend Ethan asked for my take, I’ll break down why this vulnerability is so dangerous.

### Why This Vulnerability is Different (And Worse) Than Most

#### 1. Zero-Click Attacks: No Interaction Needed

Most hacks require you to do something, like click a link, download a file, or enter a password. This one? Your phone can get hacked just by receiving a video or audio file.

* iMessage, Mail, or even AirDrop could deliver the payload.
* No warnings, no suspicious prompts, just silent exploitation.

#### 2. Media Files Are the Perfect Weapon

Unlike executable files (.exe), which security tools flag, media files (MP4, PDF, GIF) are considered “safe.” That makes them ideal for bypassing filters.

Past examples of weaponized media files:

* 2016 (“Peekaboo”), a bug where malicious PDFs bypassed iPhone security.
* 2019 (WhatsApp CVE-2019-3568), a flaw that let MP4 files hijack phones.
* 2023 (BLASTPASS), an exploit that turned harmless looking WebP images into spyware via iMessage.

#### 3. Apple’s Own Features Are Being Exploited

This latest attack abuses High Order Ambisonics (HOA), which is Apple’s new 3D audio format for iPhone 16’s “spatial videos.”

Why attackers love it:

* It’s new & untested code, making it more likely to contain overlooked flaws.
* It provides deep system access, meaning it can bypass normal security checks.
* Most users don’t even know it exists, which makes it perfect for stealth attacks.

#### The Bigger Problem: Apple’s Lack of Transparency

Apple did patch this flaw in iOS 18.4.1, which deserves credit as it was handled quickly. However, their security notes are vague:

* There are no details on how the exploit worked.
* No mention of who was targeted, although they admit it was used in real attacks.
* They quietly fixed a PAC (Pointer Authentication, Apple’s key security feature) bypass in the same update, meaning attackers likely had a full exploit chain.

#### Why This Silence Hurts Users

* Businesses & employees sending files to other employees/partners or candidates could unknowingly spread malware.
* High-risk individuals like journalists, activists, and executives remain in the dark about real threats like these.
* Security researchers can’t properly analyze risks without details being provided, as reverse engineering can only go so far.

### What’s Next? (And How to Protect Yourself)

#### Future Threats on the Horizon

* I fully expect to see AI-generated weaponized media, like an AI music video triggering malware or an exploit process.
* More 3D media flaws—As Apple pushes their Vision Pro and targets spatial computing, I expect new vulnerabilities to be found and abused.

#### 3 Simple Steps to Stay Safe

* Update your iPhone immediately (iOS 18.4.1 patches this flaw).
* Disable auto-preview in Messages (Settings > Messages > Link Previews → Off).
* Be cautious with media files – Even from known contacts, think twice before opening.

#### Final Thoughts: A Wake-Up Call

This is proof that seemingly “safe” files can be quite dangerous weapons. Until Apple becomes more transparent about threats related to their tech, we’re all playing defense in the dark.

Stay safe out there.
