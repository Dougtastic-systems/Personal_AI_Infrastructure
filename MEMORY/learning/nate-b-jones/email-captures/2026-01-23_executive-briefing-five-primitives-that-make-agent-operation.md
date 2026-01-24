# Executive Briefing: Five Primitives That Make Agent Operations Safe

**Date:** 2026-01-23
**Source:** Email (paid subscriber content)
**Captured:** 2026-01-24T04:28:41.440Z

---

**









From:
**Nate from Nate’s Substack <natesnewsletter@substack.com> on behalf of Nate from Nate’s Substack <natesnewsletter@substack.com>**
Reply-To: **Nate from Nate’s Substack <reply+30qwe2&8r1h1&&1a2766b6427b0236b55f6a108837e49dadd2a3be4ad62661f5e80050b9a0e88c@mg1.substack.com>**
Date: **Sunday, December 28, 2025 at 9:05 AM**
To: **Doug Snyder <dsnyder@cydcor.com>**
Subject: **Executive Briefing: Five Primitives That Make Agent Operations Safe












This email has been sent from an external source










Watch now | We spent 20 years making software undoable.




͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­͏
­























Forwarded this email?
[
Subscribe here](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL3N1YnNjcmliZT91dG1fc291cmNlPWVtYWlsJnV0bV9jYW1wYWlnbj1lbWFpbC1zdWJzY3JpYmUmcj04cjFoMSZuZXh0PWh0dHBzJTNBJTJGJTJGbmF0ZXNuZXdzbGV0dGVyLnN1YnN0YWNrLmNvbSUyRnAlMkZleGVjdXRpdmUtYnJpZWZpbmctdGhlLWh1bWFuLXRocm90dGxld2hhdCIsInAiOjE4MjY1MzU2MiwicyI6MTM3MzIzMSwiZiI6dHJ1ZSwidSI6MTQ2OTg1NDksImlhdCI6MTc2Njk0MTQ5OCwiZXhwIjoyMDgyNTE3NDk4LCJpc3MiOiJwdWItMCIsInN1YiI6ImxpbmstcmVkaXJlY3QifQ.eaHOYq5Fmc0aQ-k26wZFjeArCV9bg2n3tfOS6I23vlc?) for more















Get the full post and max your AI career leverage, plus connect with thousands of other AI professionals in Nate’s Substack chat and Discord communities.






Subscribers get ~10 full AI emails a week!





[**Upgrade
to paid**](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL3N1YnNjcmliZT91dG1fc291cmNlPXBvc3QmdXRtX2NhbXBhaWduPWVtYWlsLWNoZWNrb3V0Jm5leHQ9aHR0cHMlM0ElMkYlMkZuYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tJTJGcCUyRmV4ZWN1dGl2ZS1icmllZmluZy10aGUtaHVtYW4tdGhyb3R0bGV3aGF0JnI9OHIxaDEmdG9rZW49ZXlKMWMyVnlYMmxrSWpveE5EWTVPRFUwT1N3aWFXRjBJam94TnpZMk9UUXhORGs0TENKbGVIQWlPakUzTmprMU16TTBPVGdzSW1semN5STZJbkIxWWkweE16Y3pNak14SWl3aWMzVmlJam9pWTJobFkydHZkWFFpZlEuRkJoR1B5ODZwc0RuUTR3UGpHaEQ3b19VNkJDY2ltSUVZcUZYTXJDYnZYayIsInAiOjE4MjY1MzU2MiwicyI6MTM3MzIzMSwiZiI6dHJ1ZSwidSI6MTQ2OTg1NDksImlhdCI6MTc2Njk0MTQ5OCwiZXhwIjoyMDgyNTE3NDk4LCJpc3MiOiJwdWItMCIsInN1YiI6ImxpbmstcmVkaXJlY3QifQ.iBneYDSWYfCURQQv5N1TEAu8B0NxDiamv81wsksSbxA?&utm_medium=email&utm_source=subscribe-widget-preamble&utm_content=182653562)












[](https://substack.com/app-link/post?publication_id=1373231&post_id=182653562&utm_source=podcast-email&play_audio=true&r=8r1h1&utm_campaign=email-play-on-substack&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgyNjUzNTYyLCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MTc2OTUzMzQ5OCwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.BJxITcw-8l9ApndIVY6Iw4BL9CTNpxcM3PwHSWvVGhM)



[Subscribe
and watch](https://substack.com/app-link/post?publication_id=1373231&post_id=182653562&utm_source=podcast-email&play_audio=true&r=8r1h1&utm_campaign=email-play-on-substack&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgyNjUzNTYyLCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MTc2OTUzMzQ5OCwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.BJxITcw-8l9ApndIVY6Iw4BL9CTNpxcM3PwHSWvVGhM)































[**Watch
now**](https://substack.com/app-link/post?publication_id=1373231&post_id=182653562&utm_source=podcast-email&play_audio=true&r=8r1h1&utm_campaign=email-play-on-substack&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgyNjUzNTYyLCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MTc2OTUzMzQ5OCwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.BJxITcw-8l9ApndIVY6Iw4BL9CTNpxcM3PwHSWvVGhM&utm_content=watch_now_button)




























# [Executive
Briefing: Five Primitives That Make Agent Operations Safe](https://substack.com/app-link/post?publication_id=1373231&post_id=182653562&utm_source=post-email-title&utm_campaign=email-post-title&isFreemail=true&r=8r1h1&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgyNjUzNTYyLCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MTc2OTUzMzQ5OCwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.BJxITcw-8l9ApndIVY6Iw4BL9CTNpxcM3PwHSWvVGhM)


###
Demos happen in sandboxes where mistakes don't matter. Your business happens in a world where mistakes cost real money, real trust, and sometimes real careers. Here's what it takes
to close that gap.















[Nate](https://substack.com/@natesnewsletter)
















Dec 28











∙







Preview






















[](https://substack.com/@natesnewsletter)





































[](https://substack.com/app-link/post?publication_id=1373231&post_id=182653562&utm_source=substack&isFreemail=true&submitLike=true&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgyNjUzNTYyLCJyZWFjdGlvbiI6IuKdpCIsImlhdCI6MTc2Njk0MTQ5OCwiZXhwIjoxNzY5NTMzNDk4LCJpc3MiOiJwdWItMTM3MzIzMSIsInN1YiI6InJlYWN0aW9uIn0.V7DYFtOwxzrCEEbg-uvcvwLdzXe4q44pzhPIOxcrZ58&utm_medium=email&utm_campaign=email-reaction&r=8r1h1)













[](https://substack.com/app-link/post?publication_id=1373231&post_id=182653562&utm_source=substack&utm_medium=email&isFreemail=true&comments=true&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgyNjUzNTYyLCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MTc2OTUzMzQ5OCwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.BJxITcw-8l9ApndIVY6Iw4BL9CTNpxcM3PwHSWvVGhM&r=8r1h1&utm_campaign=email-half-magic-comments&action=post-comment&utm_source=substack&utm_medium=email)













[](https://substack.com/app-link/post?publication_id=1373231&post_id=182653562&utm_source=substack&utm_medium=email&utm_content=share&utm_campaign=email-share&action=share&triggerShare=true&isFreemail=true&r=8r1h1&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgyNjUzNTYyLCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MTc2OTUzMzQ5OCwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.BJxITcw-8l9ApndIVY6Iw4BL9CTNpxcM3PwHSWvVGhM)













[](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9vcGVuLnN1YnN0YWNrLmNvbS9wdWIvbmF0ZXNuZXdzbGV0dGVyL3AvZXhlY3V0aXZlLWJyaWVmaW5nLXRoZS1odW1hbi10aHJvdHRsZXdoYXQ_dXRtX3NvdXJjZT1zdWJzdGFjayZ1dG1fbWVkaXVtPWVtYWlsJnV0bV9jYW1wYWlnbj1lbWFpbC1yZXN0YWNrLWNvbW1lbnQmYWN0aW9uPXJlc3RhY2stY29tbWVudCZyPThyMWgxJnRva2VuPWV5SjFjMlZ5WDJsa0lqb3hORFk1T0RVME9Td2ljRzl6ZEY5cFpDSTZNVGd5TmpVek5UWXlMQ0pwWVhRaU9qRTNOalk1TkRFME9UZ3NJbVY0Y0NJNk1UYzJPVFV6TXpRNU9Dd2lhWE56SWpvaWNIVmlMVEV6TnpNeU16RWlMQ0p6ZFdJaU9pSndiM04wTFhKbFlXTjBhVzl1SW4wLkJKeElUY3ctOGw5QXBuZElWWTZJdzRCTDlDVE5weGNNM1B3SFNXdlZHaE0iLCJwIjoxODI2NTM1NjIsInMiOjEzNzMyMzEsImYiOnRydWUsInUiOjE0Njk4NTQ5LCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MjA4MjUxNzQ5OCwiaXNzIjoicHViLTAiLCJzdWIiOiJsaW5rLXJlZGlyZWN0In0.7rLQ8174soOOz3PfotEQpbA2dG5765zSdue9I-bxmBs?&utm_source=substack&utm_medium=email)






















[](https://open.substack.com/pub/natesnewsletter/p/executive-briefing-the-human-throttlewhat?utm_source=email&redirect=app-store&utm_campaign=email-read-in-app)


[READ
IN APP](https://open.substack.com/pub/natesnewsletter/p/executive-briefing-the-human-throttlewhat?utm_source=email&redirect=app-store&utm_campaign=email-read-in-app)































We spent 20 years making software undoable. Version control, code review, staging environments, canary deployments, rollback procedures—the entire culture of modern software delivery is one long project in making mistakes survivable.
That’s the hidden reason AI agents are actually working in engineering. The environment was deliberately designed so that errors don’t have to be catastrophic.



The rest of your business wasn’t designed that way.



That’s why agents fail everywhere else—not because they aren’t smart enough, but because mistakes in most business operations can’t be recovered at machine speed. The gap between what agents can do in demos and what organizations
are willing to let them do in production isn’t primarily an intelligence gap. It’s a reversibility gap. Demos happen in sandboxes where mistakes don’t matter much. Your business happens in a world where mistakes cost real money, real trust, and sometimes real
careers.



This briefing explores what it would actually take to close that gap:


-
**The zone of comfort**: A framework for understanding why some decisions feel safe to delegate and others don’t—and why the path to agent autonomy runs through reversibility, not intelligence
-
**The civilization of undo**: How software engineering built the infrastructure for safe change over decades, and what that infrastructure actually consists of
-
**The human throttle**: What informal safety system humans have been providing all along, and what happens when you remove it
-
**Primitives for reversibility**: The specific mechanisms that would need to exist before agents could safely operate in domains beyond code



The organizations that figure this out won’t necessarily have the most sophisticated AI. They’ll have the most boring agent operations—predictable, bounded, recoverable. That boringness is the point.






Executive Circle members enjoy all these Sunday briefings! Curious? You can easily
[
change your plan here...](https://substack.com/redirect/f9bc7d36-a768-4184-a020-c4a5c58281dd?j=eyJ1IjoiOHIxaDEifQ.bBvEbuUaT64-3FYFS8XubQvPw9CPsnWNsoHgk_rgvzU)





[**Upgrade
to paid**](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL3N1YnNjcmliZT91dG1fc291cmNlPXBvc3QmdXRtX2NhbXBhaWduPWVtYWlsLWNoZWNrb3V0Jm5leHQ9aHR0cHMlM0ElMkYlMkZuYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tJTJGcCUyRmV4ZWN1dGl2ZS1icmllZmluZy10aGUtaHVtYW4tdGhyb3R0bGV3aGF0JnI9OHIxaDEmdG9rZW49ZXlKMWMyVnlYMmxrSWpveE5EWTVPRFUwT1N3aWFXRjBJam94TnpZMk9UUXhORGs0TENKbGVIQWlPakUzTmprMU16TTBPVGdzSW1semN5STZJbkIxWWkweE16Y3pNak14SWl3aWMzVmlJam9pWTJobFkydHZkWFFpZlEuRkJoR1B5ODZwc0RuUTR3UGpHaEQ3b19VNkJDY2ltSUVZcUZYTXJDYnZYayIsInAiOjE4MjY1MzU2MiwicyI6MTM3MzIzMSwiZiI6dHJ1ZSwidSI6MTQ2OTg1NDksImlhdCI6MTc2Njk0MTQ5OCwiZXhwIjoyMDgyNTE3NDk4LCJpc3MiOiJwdWItMCIsInN1YiI6ImxpbmstcmVkaXJlY3QifQ.iBneYDSWYfCURQQv5N1TEAu8B0NxDiamv81wsksSbxA?&utm_medium=email&utm_source=subscribe-widget-preamble&utm_content=182653562)








##
Upgrade your subscription to Nate’s Substack to unlock the rest.



Become a AI Executive Circle of Nate’s Substack to get access to this post.




[Upgrade
to AI Executive Circle](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL3N1YnNjcmliZT91dG1fc291cmNlPXBvc3QmcGxhbj1mb3VuZGluZyZ1dG1fY2FtcGFpZ249ZW1haWwtZm91bmRpbmctY2hlY2tvdXQmbmV4dD1odHRwcyUzQSUyRiUyRm5hdGVzbmV3c2xldHRlci5zdWJzdGFjay5jb20lMkZwJTJGZXhlY3V0aXZlLWJyaWVmaW5nLXRoZS1odW1hbi10aHJvdHRsZXdoYXQmcj04cjFoMSZ0b2tlbj1leUoxYzJWeVgybGtJam94TkRZNU9EVTBPU3dpYVdGMElqb3hOelkyT1RReE5EazRMQ0psZUhBaU9qRTNOamsxTXpNME9UZ3NJbWx6Y3lJNkluQjFZaTB4TXpjek1qTXhJaXdpYzNWaUlqb2lZMmhsWTJ0dmRYUWlmUS5GQmhHUHk4NnBzRG5RNHdQakdoRDdvX1U2QkNjaW1JRVlxRlhNckNidlhrIiwicCI6MTgyNjUzNTYyLCJzIjoxMzczMjMxLCJmIjp0cnVlLCJ1IjoxNDY5ODU0OSwiaWF0IjoxNzY2OTQxNDk4LCJleHAiOjIwODI1MTc0OTgsImlzcyI6InB1Yi0wIiwic3ViIjoibGluay1yZWRpcmVjdCJ9.jqY9osSiMOC4JG9k6yC5UPWqmAi0845mSCIdryWYLH4?simple=true&utm_source=paywall&utm_medium=email&utm_content=182653562&next=https://natesnewsletter.substack.com/p/executive-briefing-the-human-throttlewhat)





###
A subscription gets you:










About 10 posts a week on AI, including videos, guides, and how-to’s










Subscriber-only podcast episodes










Active private substack chat with daily posts on all things AI






###
A subscription gets you:










A weekly executive insights memo focused on board-level AI, markets, and investments






























[Like](https://substack.com/app-link/post?publication_id=1373231&post_id=182653562&utm_source=substack&isFreemail=true&submitLike=true&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgyNjUzNTYyLCJyZWFjdGlvbiI6IuKdpCIsImlhdCI6MTc2Njk0MTQ5OCwiZXhwIjoxNzY5NTMzNDk4LCJpc3MiOiJwdWItMTM3MzIzMSIsInN1YiI6InJlYWN0aW9uIn0.V7DYFtOwxzrCEEbg-uvcvwLdzXe4q44pzhPIOxcrZ58&utm_medium=email&utm_campaign=email-reaction&r=8r1h1)













[Comment](https://substack.com/app-link/post?publication_id=1373231&post_id=182653562&utm_source=substack&utm_medium=email&isFreemail=true&comments=true&token=eyJ1c2VyX2lkIjoxNDY5ODU0OSwicG9zdF9pZCI6MTgyNjUzNTYyLCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MTc2OTUzMzQ5OCwiaXNzIjoicHViLTEzNzMyMzEiLCJzdWIiOiJwb3N0LXJlYWN0aW9uIn0.BJxITcw-8l9ApndIVY6Iw4BL9CTNpxcM3PwHSWvVGhM&r=8r1h1&utm_campaign=email-half-magic-comments&action=post-comment&utm_source=substack&utm_medium=email)













[Restack](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9vcGVuLnN1YnN0YWNrLmNvbS9wdWIvbmF0ZXNuZXdzbGV0dGVyL3AvZXhlY3V0aXZlLWJyaWVmaW5nLXRoZS1odW1hbi10aHJvdHRsZXdoYXQ_dXRtX3NvdXJjZT1zdWJzdGFjayZ1dG1fbWVkaXVtPWVtYWlsJnV0bV9jYW1wYWlnbj1lbWFpbC1yZXN0YWNrLWNvbW1lbnQmYWN0aW9uPXJlc3RhY2stY29tbWVudCZyPThyMWgxJnRva2VuPWV5SjFjMlZ5WDJsa0lqb3hORFk1T0RVME9Td2ljRzl6ZEY5cFpDSTZNVGd5TmpVek5UWXlMQ0pwWVhRaU9qRTNOalk1TkRFME9UZ3NJbVY0Y0NJNk1UYzJPVFV6TXpRNU9Dd2lhWE56SWpvaWNIVmlMVEV6TnpNeU16RWlMQ0p6ZFdJaU9pSndiM04wTFhKbFlXTjBhVzl1SW4wLkJKeElUY3ctOGw5QXBuZElWWTZJdzRCTDlDVE5weGNNM1B3SFNXdlZHaE0iLCJwIjoxODI2NTM1NjIsInMiOjEzNzMyMzEsImYiOnRydWUsInUiOjE0Njk4NTQ5LCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MjA4MjUxNzQ5OCwiaXNzIjoicHViLTAiLCJzdWIiOiJsaW5rLXJlZGlyZWN0In0.7rLQ8174soOOz3PfotEQpbA2dG5765zSdue9I-bxmBs?&utm_source=substack&utm_medium=email)






































© 2025 Nate

548 Market Street PMB 72296, San Francisco, CA 94104

[Unsubscribe](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9uYXRlc25ld3NsZXR0ZXIuc3Vic3RhY2suY29tL2FjdGlvbi9kaXNhYmxlX2VtYWlsP3Rva2VuPWV5SjFjMlZ5WDJsa0lqb3hORFk1T0RVME9Td2ljRzl6ZEY5cFpDSTZNVGd5TmpVek5UWXlMQ0pwWVhRaU9qRTNOalk1TkRFME9UZ3NJbVY0Y0NJNk1UYzVPRFEzTnpRNU9Dd2lhWE56SWpvaWNIVmlMVEV6TnpNeU16RWlMQ0p6ZFdJaU9pSmthWE5oWW14bFgyVnRZV2xzSW4wLkZGaHpScHZRazhPSHFfMzlKX1B0d2ZtV1BIT3NFekxaQks2bnhlRnQyU2ciLCJwIjoxODI2NTM1NjIsInMiOjEzNzMyMzEsImYiOnRydWUsInUiOjE0Njk4NTQ5LCJpYXQiOjE3NjY5NDE0OTgsImV4cCI6MjA4MjUxNzQ5OCwiaXNzIjoicHViLTAiLCJzdWIiOiJsaW5rLXJlZGlyZWN0In0.sG6KmPNQrRzIxh8cbs475edMaBpaxczmU3E_2sLbu20?)




[](https://substack.com/redirect/2/eyJlIjoiaHR0cHM6Ly9zdWJzdGFjay5jb20vc2lnbnVwP3V0bV9zb3VyY2U9c3Vic3RhY2smdXRtX21lZGl1bT1lbWFpbCZ1dG1fY29udGVudD1mb290ZXImdXRtX2NhbXBhaWduPWF1dG9maWxsZWQtZm9vdGVyJmZyZWVTaWdudXBFbWFpbD1kc255ZGVyQGN5ZGNvci5jb20mcj04cjFoMSIsInAiOjE4MjY1MzU2MiwicyI6MTM3MzIzMSwiZiI6dHJ1ZSwidSI6MTQ2OTg1NDksImlhdCI6MTc2Njk0MTQ5OCwiZXhwIjoyMDgyNTE3NDk4LCJpc3MiOiJwdWItMCIsInN1YiI6ImxpbmstcmVkaXJlY3QifQ.SztLAcAoM0bya9N_Hr8Xyf4H5TKY-tBSNdqMhaKqQuo?)















This message and any attached documents contains confidential and/or proprietary information of Cydcor LLC and/or its subsidiaries, agents, vendors, subcontractors and clients, and is not to be shared with others without the prior written consent of Cydcor
LLC. This information may not be reproduced, copied, disseminated or used for any purpose other than the purpose for which it was delivered to the recipient, without prior written consent of Cydcor LLC. Upon the request of Cydcor LLC, this information must
be, without delay, returned or destroyed, in accordance with the instructions of Cydcor LLC., without the recipient retaining copies or notes of any kind or nature of this document or derived from it. If you are not the intended recipient, you may not read,
copy, distribute, or use this information. If you are not the intended recipient, please notify the sender by return email and immediately delete this message.

---
*Captured via gmail-fetch from forwarded Substack email*
