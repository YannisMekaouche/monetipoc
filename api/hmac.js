// https://www.monetico-paiement.fr/fr/info/documentations/Monetico_Paiement_documentation_technique_v2.0.pdf

import {
    signHmacSha1,
    generateOperationalHmac,
    generateRandomString,
    base64Encode
} from '../utils'

const moment = require('moment')

const version = '3.0'

export default (req, res) => {
  const {
      montant,
      context,
      url_retour_ok,
      url_retour_err
  } = req.query

  const {
      TPE,
      lgue,
      societe
  } = process.env

  const secretKey = process.env.moneticoSecretKey
  const date = moment().utc().format('DD/MM/YYYY:HH:mm:ss')
  const contexte_commande = base64Encode(context)

  const reference = `REF${generateRandomString(9)}`

  const fields = {
    TPE,
    lgue,
    url_retour_ok,
    url_retour_err,
    societe,
    montant,
    contexte_commande,
    reference,
    date,
    version
  }

  const strFieldsOrder = [
    'TPE',
    'contexte_commande',
    'date',
    'lgue',
    'montant',
    'reference',
    'societe',
    'url_retour_err',
    'url_retour_ok',
    'version'
  ]

  const strFields = strFieldsOrder.map(k => `${k}=${fields[k]}`).join('*')
  const encodedSecret = generateOperationalHmac(secretKey)

  const mac = signHmacSha1(encodedSecret, strFields)

  res.json({
    fields,
    mac
  })
}
