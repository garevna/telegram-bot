export const sendMessage = async message => {
  const url = `https://api.telegram.org/bot${process.env.VUE_APP_TELEGRAM_BOT_KEY}/sendMessage?chat_id=${process.env.VUE_APP_TELEGRAM_CHAT_ID}`
  const query = encodeURIComponent(Object.keys(message).map(key => `${key}: ${message[key]}`).join('\n'))
  const response = await fetch(`${url}&text=${query}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })

  return { status: response.status, result: await response.json() }
}
