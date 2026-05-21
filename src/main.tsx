import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "./provider/theme-provider.tsx";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
