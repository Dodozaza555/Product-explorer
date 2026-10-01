import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "./auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  const isLoggedIn = !!session?.user;

  return (
    <main className="storefront">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Desk Objects home">
          FORM <span>/</span> FUNCTION
        </Link>
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
      </header>

      <section className="storefront-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">THE DESK EDIT / 2026</p>
          <h1 id="hero-title">พื้นที่ทำงานที่ดี<br />เริ่มจากของที่ใช่</h1>
          <p className="hero-description">
            คัดอุปกรณ์ชิ้นสำคัญที่ทำให้ทุกวันบนโต๊ะทำงานลงตัวขึ้น
          </p>
        </div>
        <div className="hero-note">
          <span className="hero-note-label">CURATED TOOLS</span>
          <strong>01 <span>/</span> 03</strong>
          <p>อุปกรณ์เรียบง่าย<br />สำหรับไอเดียที่ไปได้ไกล</p>
        </div>
      </section>

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2 id="catalog-title">ของใช้บนโต๊ะ</h2>
          </div>
          <span className="catalog-count">{String(products.length).padStart(2, "0")} ITEMS</span>
        </div>

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product, index) => (
              <article className="product-card" key={product.id} data-testid="product">
                <div
                  className={`product-art product-art--${product.id}`}
                  aria-hidden="true"
                >
                  <span className="art-index">0{index + 1}</span>
                  <span className="art-caption">DESK ESSENTIAL</span>
                  <span className="product-object" />
                </div>
                <div className="product-info">
                  <div className="product-meta">
                    <span>WORKSPACE</span>
                    <span>#{product.id.toUpperCase()}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <strong>฿{product.price.toLocaleString("th-TH")}</strong>
                    {isLoggedIn && (
                      <div className="product-actions">
                        <Link href={`/products/${product.id}/edit`}>แก้ไข</Link>
                        <Link href={`/products/${product.id}/delete`}>ลบ</Link>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">ยังไม่มีสินค้าในคอลเลกชัน</p>
        )}
      </section>

      <footer className="site-footer">
        <span>FORM / FUNCTION</span>
        <span>TOOLS FOR BETTER WORKDAYS</span>
      </footer>
    </main>
  );
}