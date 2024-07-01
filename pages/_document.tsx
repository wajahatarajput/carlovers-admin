import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>

        <script src="/assets/bootstrap/js/bootstrap.min.js" defer></script>
        <script src="/assets/js/chart.min.js" defer></script>
        <script src="/assets/js/bs-init.js" defer></script>
        <script src="/assets/js/theme.js" defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
