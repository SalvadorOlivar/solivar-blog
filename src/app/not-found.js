import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notFoundPage">
      <h1>404</h1>
      <p>El contenido que buscas no existe o fue movido.</p>
      <Link href="/" className="backHomeLink">
        Volver al inicio
      </Link>
    </div>
  );
}
