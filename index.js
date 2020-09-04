const UwU = require('./lib/uwu')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest (request) {
  if (request.method !== 'POST') {
    return new Response('Bad request.', { status: 400 })
  }

  try {
    const {
      messageId,
      text,
      chatId
    } = await validateAndParseWebhookRequest(request)

    // ignore empty text (images, etc.)
    if (!text) {
      return sendMessage(UwU('Sorry I can process only plain text messages >w<'), chatId)
    }
    // ignore commands
    if (text.charAt(0) === '/') {
      return sendMessage(UwU('Sorry I don\'t understand commands >w<'), chatId)
    }

    return sendMessage(UwU(text), chatId, { reply_to_message_id: messageId })
  } catch (e) {
    return new Response('Bad request.', { status: 400 })
  }
}

/**
 * Validate and parse Telegram webhook request
 * @param {Request} request Telegram webhook request object
 * @returns {Promise}
 */
async function validateAndParseWebhookRequest (request) {
  const json = await request.json()

  if (
    !Number(json.update_id) ||
    !json.message ||
    !Number(json.message.message_id) ||
    !json.message.chat ||
    !Number(json.message.chat.id)
  ) {
    throw new Error('Invalid JSON object.')
  }

  return {
    updateId: Number(json.update_id),
    messageId: Number(json.message.message_id),
    text: json.message.text,
    chatId: Number(json.message.chat.id)
  }
}

/**
 * Create sendMessage Telegram bot response
 *
 * @param {string} text Message text
 * @param {number} chatId Chat to send message to
 * @param options Other options
 * @returns {Response}
 */
function sendMessage (text, chatId, options = {}) {
  const finalOptions = Object.assign({
    chat_id: chatId,
    text
  }, options)

  return method('sendMessage', finalOptions)
}

/**
 * Create Telegram bot response that calls an API method
 *
 * @param {string} methodName Telegram API method name
 * @param options Method options
 * @param headers Response headers
 * @returns {Response}
 */
function method (methodName, options, headers = {}) {
  return new Response(JSON.stringify(Object.assign({
    method: methodName
  }, options)), {
    headers: Object.assign({ 'content-type': 'application/json' }, headers)
  })
}
