interface Mirror {
    country: string;
    url: string;
}

export default function getMirror(coutry: string) {

    const mirrors: Mirror[] = [
        // Canada
        { country: "CA", url: "https://mirror.csclub.uwaterloo.ca/gentoo-distfiles/" },
        // United States
        { country: "US", url: "https://gentoo.osuosl.org/" },
        // Australia
        { country: "AU", url: "https://mirror.aarnet.edu.au/pub/gentoo/" },
        // Germany
        { country: "DE", url: "https://ftp.fau.de/gentoo/" },
        // China
        { country: "CN", url: "https://mirrors.tuna.tsinghua.edu.cn/gentoo/" },
        // United Kingdom
        { country: "UK", url: "https://gentoo.mirrors.ovh.net/gentoo-distfiles/" },
        // France
        { country: "FR", url: "https://mirror.cyberbits.eu/gentoo/" },
        // Japan
        { country: "JP", url: "https://ftp.jaist.ac.jp/pub/Linux/Gentoo/" },
        // Netherlands
        { country: "NL", url: "https://mirror.leaseweb.com/gentoo/" },
        // Italy
        { country: "IT", url: "https://mirrors.dotsrc.org/gentoo/" },
        // Sweden
        { country: "SE", url: "https://mirror.netcologne.de/gentoo/" },
        // Spain
        { country: "ES", url: "https://gentoo.redsauce.net/distfiles/" },
        // Czech Republic
        { country: "CZ", url: "https://mirror.dkm.cz/pub/gentoo/" },
        // Brazil
        { country: "BR", url: "https://gentoo.c3sl.ufpr.br/" },
        // Belgium
        { country: "BE", url: "https://mirror.telepoint.bg/gentoo/" },
        // India
        { country: "IN", url: "https://gentoo.mirror.dhakacom.com/" },
        // South Korea
        { country: "KR", url: "https://mirror.yongbok.net/gentoo/" },
        // Switzerland
        { country: "CH", url: "https://mirror.init7.net/gentoo/" },
        // Austria
        { country: "AT", url: "https://mirror.inode.at/gentoo/" },
        // Denmark
        { country: "DK", url: "https://ftp.snt.utwente.nl/pub/os/linux/gentoo/" },
        // Finland
        { country: "FI", url: "https://ftp.lysator.liu.se/pub/gentoo/" },
        // Norway
        { country: "NO", url: "https://mirror.eject.name/gentoo/" },
        // Portugal
        { country: "PT", url: "https://gentoo.ussg.iu.edu/gentoo-distfiles/" },
        // Greece
        { country: "GR", url: "https://ftp.cc.uoc.gr/mirrors/linux/gentoo/" },
        // Hungary
        { country: "HU", url: "https://mirror.math.princeton.edu/pub/gentoo/" },
        // Poland
        { country: "PL", url: "http://ftp.vectranet.pl/gentoo/" },
        // Taiwan
        { country: "TW", url: "https://ftp.yzu.edu.tw/Linux/gentoo/" },
        // Turkey
        { country: "TR", url: "https://ftp.volia.net/pub/mirrors/gentoo/gentoo-distfiles/" },
        // Ukraine
        { country: "UA", url: "https://mirror.neolabs.kiev.ua/gentoo/" },
        // South Africa
        { country: "ZA", url: "https://mirror.is.co.za/mirror/gentoo/" },
        // Slovakia
        { country: "SK", url: "https://mirror.jaleco.com/gentoo/" },
        // Argentina
        { country: "AR", url: "https://gentoo.conatel.com.uy/" },
        // Bulgaria
        { country: "BG", url: "https://gentoo.otenet.gr/distfiles/" },
        // Croatia
        { country: "HR", url: "https://ftp.heanet.ie/pub/gentoo/" },
        // Lithuania
        { country: "LT", url: "https://ftp.cc.uoc.gr/mirrors/linux/gentoo/" },
        // Mexico
        { country: "MX", url: "https://ftp.icm.edu.pl/pub/Linux/gentoo/" },
        // New Zealand
        { country: "NZ", url: "https://mirror.bytemark.co.uk/gentoo/" },
        // Romania
        { country: "RO", url: "https://mirror.bytemark.co.uk/gentoo/" },
    ]

    let mirror = "https://gentoo.osuosl.org/"

    mirrors.forEach((key) => {
        if (key.country == coutry) {
            mirror = key.url
        }
    })

    return mirror
}