# osmium
A collection of tools and services for performing VRT testing.

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
