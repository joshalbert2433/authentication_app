import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import store from "./../redux/store";
import { Provider } from "react-redux";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	return (
		<Provider store={store}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
				<Toaster />
			</SessionProvider>
		</Provider>
	);
}
