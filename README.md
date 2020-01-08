# MonetiPOC

MonetiPOC is a tiny client / server project that generates a Monetico payment button. It uses HTML for frontend, NodeJS for API and Now for serverless

# Goal

MonetiPOC is an implementation of [monetico-paiement](https://www.monetico-paiement.fr/).  Monetico is used by CIC and Credit Mutuel to integrate payment solution to any e-commerce site / websites. This project demonstrates a simple way to integrate Monetico on a client-side rendered page.

# How

As Monetico secret key cannot be shared and so keep on client side, an endpoint generating `mac` key is integrated. This way, you can keep you frontend page quiet simple as the only operations to do are :
* Request API endpoint with customer informations, like `montant`
* Fill form hidden fields with API response (`fields` and `mac`)

Then, you are redirected onto Monetico payment page.

# Try
[Let's try it now](https://monetipoc.now.sh/)

# Develop
* Checkout master branch of [Apokly/monetipoc](https://github.com/Apokly/monetipoc)
* Update `now.json` file with personal Monetico informations : `moneticoSecretKey`, `TPE`, `lgue` and `societe` (See [Monetico documentation](https://www.monetico-paiement.fr/fr/info/documentations/Monetico_Paiement_documentation_technique_v2.0.pdf))
* `now dev`
