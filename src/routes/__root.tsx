import { Outlet, Link, createRootRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-lumen-cream px-4">
      <Card className="max-w-md text-center">
        <p className="font-display text-[64px] leading-none text-vast-ink">404</p>
        <h2 className="mt-4 text-[24px] font-medium text-vast-ink">Страница не найдена</h2>
        <p className="mt-2 text-base text-fog">Такого адреса нет в прототипе BuildContract.</p>
        <div className="mt-6">
          <Link to="/">
            <Button>На главную</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-lumen-cream px-4">
      <Card className="max-w-md text-center">
        <h1 className="font-display text-[32px] leading-none text-vast-ink">
          Страница не загрузилась
        </h1>
        <p className="mt-3 text-base text-fog">
          Ошибка на стороне приложения. Обновите страницу или вернитесь на главную.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Обновить
          </Button>
          <Link to="/">
            <Button variant="secondary">На главную</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
