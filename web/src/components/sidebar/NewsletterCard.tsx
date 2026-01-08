"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NewsletterCard() {
  const [email, setEmail] = useState("");

  const openMail = () => {
    const mail = "marketing@educandoseubolso.blog.br";
    const subject = encodeURIComponent("Assinatura Newsletter ESB");
    const body = encodeURIComponent(`Olá,\n\nQuero assinar a newsletter.\nEmail: ${email}\n\nObrigado!`);
    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
  };

  return (
    <Card className="bg-card border-border/60 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Assine nossa newsletter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Receba análises, rankings e simuladores direto no seu e-mail.
        </p>
        <div className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            className="flex-1 px-3 py-2 rounded-md bg-muted text-foreground placeholder-muted-foreground border border-border"
          />
          <Button
            onClick={openMail}
            variant="ghost"
            className="bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-primary"
          >
            Assinar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

