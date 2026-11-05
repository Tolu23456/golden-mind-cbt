# Networks and the internet

A **network** connects computers so they can share data. The **internet** is a network of networks, linking devices all over the world.

## LAN and WAN

- A **LAN** (local area network) covers one building, such as a school computer room.
- A **WAN** (wide area network) covers a city, country or the world. The internet is the largest WAN.

## How data travels

Data is split into small **packets**. Each packet carries the address it is going to and the address it came from. Packets can take different routes and are put back in order at the destination.

This design is resilient: if one route fails, packets go another way.

## Addresses

- An **IP address** identifies a device on a network, such as `192.168.1.10` or `2001:db8::1`.
- A **domain name** is the human-friendly name, such as `example.com`.
- **DNS** (Domain Name System) translates the name into an IP address. It is the internet's contact list.

Your home router usually gives private IP addresses to your devices and shares one public address with the internet.

## Ports and protocols

A **protocol** is an agreed set of rules. Common ones:

- **HTTP/HTTPS** — web pages. HTTPS is encrypted.
- **DNS** — name lookup.
- **SMTP/IMAP** — sending and reading email.
- **FTP/SFTP** — file transfer.
- **TCP** — reliable delivery, with ordering and retries.
- **UDP** — fast, no guarantee. Used for live video and games.

A **port** is like a door on a device: 80 for HTTP, 443 for HTTPS, 25 for email.

## Routers and switches

- A **switch** connects devices inside a LAN and forwards data by MAC address.
- A **router** connects different networks and chooses a path for packets.
- A **modem** converts the signal to whatever the internet provider uses.
- A **firewall** blocks traffic that does not match the rules.

## Wi-Fi

Wi-Fi is a wireless LAN. It uses radio waves and has a limited range. Use **WPA2** or **WPA3** encryption and a strong password. Hide nothing important behind an open network.

## The web is not the internet

The internet is the infrastructure: cables, routers, protocols. The **web** is one service on top of it, made of pages and links. Email, video calls and online games are other services on the same internet.

## Speed and latency

- **Bandwidth** is how much data can move per second, measured in megabits per second. It affects how fast a large file downloads.
- **Latency** is the delay before data starts arriving, measured in milliseconds. It affects how responsive a game or video call feels.

A fast connection with high latency feels laggy. A slower connection with low latency can feel snappier for small requests.

## Security

- HTTPS encrypts the page between you and the server.
- A VPN creates an encrypted tunnel, useful on public Wi-Fi.
- Do not trust a network just because it has a familiar name.
- Keep routers updated and change the default admin password.

> Networks are built on trust and agreements. Most security problems come from a broken agreement, not a broken cable.

## Try it

Draw your school network: devices, switch, router, internet provider. Label one LAN, one WAN, one router and one firewall. Then trace the path of a message from a phone to a website.
