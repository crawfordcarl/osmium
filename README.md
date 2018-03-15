# osmium
A collection of tools and services for performing VRT testing.

# Get started

```bash
npm install

node index.js
```

You can then start using the service locally on localhost:3000. There are two endpoints available:

| endpoints     | option        | type    | description                           |
| :-----------: |:-------------:|:-------:| :------------------------------------:|
| /baseline     | image         | File    | the image file to be set as baseline (typically generated from production/master)  |
|               | id            | string  | some unique identifier for the user (this will be a uuid in future to avoid conflicts)   |
| /compare      | image      | File | the image file to be compared to the baseline image |
|               | id            | string  | the same unique identifier used when creating the baseline   |
| | branch | string | this is some name to distinguish sets of images, typically the jira ticket or branch name |

# Process

* A baseline image is uploaded to the /baseline endpoint with an identifier for future comparisons
* Another image is uploaded to the /compare endpoint which is then compared against the baseline image uploaded before

File names are used for the comparison of images, for example:

If a file is uploaded to /baseline as some-image-file.png, the comparison image should also be called some-image-file.png. If requested, we can add flexibility on this in future (adding a "compareTo" field to /compare for taking an additional filename).

The data returned comes from resemblejs. We do create new files showing the comparison/regressions, however these are not yet returned in the response.

# Whats available so far?
* Image Comparison Service - a service which allows users to upload a baseline image and compare other images against it (offering two endpoints, /baseline and /compare). Screenshots are stored locally and are compared using resemblejs, returning basic information of the analysis.
* TODO - Interface for visualising these images (baseline and failures)

# Later
* Add tracking of failures for comparisons (flakiness checks)
* Add config/options for storing screenshots externally
* Improve security
* Add some key/identifier to protect baseline from being overwritten unexpectedly
* Add node/express logging and alerts for failures
* Improvements for speed
* Notifications on failures?
* Improve performance
* Add support for multiple images, or compressed files
