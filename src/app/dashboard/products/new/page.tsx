import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "../../_components/ProductForm";

export default function AdminNewProductPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
