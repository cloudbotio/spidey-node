module.exports = {
    
    // social bundles
    facebook: "social/facebook",
    twitter: "social/twitter",
    linkedin: "social/linkedin",
    instagram: "social/instagram",
    wine: "social/wine",
    
    // ecommerce bundles
    ebay: "ecommerce/ebay",
    buscape: "ecommerce/buscape",
    mercadolivre: "ecommerce/mercadolivre",
    
    // scrapper aliases
	submarino: {
        bundle: "scrapper",
        url: "http://busca.submarino.com.br/busca.php?q=%s",
    },
    extra: {
        bundle: "scrapper",
        url: "http://buscando.extra.com.br/search?w=%s",
    },
    americanas: {  
        bundle: "scrapper",
        url: "http://busca.americanas.com.br/busca.php?q=%s"
    },
    
    // website bundles
    scrapper: "scrapper",
    website: "scrapper/website",
    
    // text file bundles
    rss: "text/rss",
    html: "scrapper",
    xml: "text/xml",
    pdf: "text/pdf",
    doc: "text/doc",  
}