import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notFoundPage">
      <h2>Post no encontrado</h2>
      <p>El contenido que buscas no existe o fue movido.</p>
      <Link href="/" className="backHomeLink">
        Volver al inicio
      </Link>
    </main>
  );
}
