# uwubot
Converts English to UwUspeak. Serverless. Please UwU responsibly :3

Test in real life: [@myuwubot](https://t.me/myuwubot)

## Deployment

This bot works with Cloudflare Workers and requires [Wrangler][0] for deployment.
It is included as a local dependency in `package.json` so you can run it with `npx`.

If you don't know how to use Wrangler or have never worked with Cloudflare Workers, [go through a tutorial here][1].

First of all, copy `wrangler.tmpl.toml` to `wrangler.toml`:

```
cp wrangler.tmpl.toml wrangler.toml
```

Then populate the config with values from your account and run the deployment command:

```
npx wrangler publish
```

After that, set a webhook pointing to the resulting worker URL for your bot:

```
curl -X POST -d '{"url":"<your-worker-url>"}' -H "Content-Type: application/json" https://api.telegram.org/bot<your-bot-token>/setWebhook
```

Now your bot should be ready to use.

## Contributing

After making any changes to the converter, please make sure that the tests in the `test/uwu.test.js` pass.

Check if they do with `npm run test`.

UwU :3

[0]: https://developers.cloudflare.com/workers/cli-wrangler/install-update
[1]: https://developers.cloudflare.com/workers/learning/getting-started
