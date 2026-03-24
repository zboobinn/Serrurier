/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "serrurerieroland@orange.fr" }],
    subject: "Nouveau message de contact - Serrurerie Roland",
    html: "<h2>Nouveau message de contact</h2><p><strong>Nom:</strong> " + e.record.get("name") + "</p><p><strong>Email:</strong> " + e.record.get("email") + "</p><p><strong>Message:</strong></p><p>" + e.record.get("message") + "</p><p><strong>Reçu le:</strong> " + e.record.get("created") + "</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "contact_messages");