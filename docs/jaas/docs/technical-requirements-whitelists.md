# Meetings domains and IP's

## Whitelisting JaaS: IP ranges and domains

In order to function properly, the 8x8 Meet and Jitsi as a Service clients require access to certain domains and IP addresses. If your users have strict firewall rules, you should make sure that they whitelist the following domains and IP ranges.

### Domains

This is the list of domains that 8x8 Meet and Jitsi as a Service clients will attempt to access during their normal operation. They should be whitelisted for HTTPS (TCP port 443). Separated by category, they are:

#### Core Operation

It is absolutely necessary that these domains are added to HTTPS (TCP port 443) whitelists. Users will be unable to use the meetings products if they are not.

* `https://8x8.com`
* `https://*.8x8.com`
* `https://8x8.vc`
* `https://*.8x8.vc`
* `https://jitsi.net`
* `https://*.jitsi.net`

#### Auxiliary Functionality

Inability to access domains on this list will disrupt some features in the product, but users should still be able to conduct basic meetings.

* `https://www.gravatar.com`
* `https://*.youtube.com`
* `https://*.dropboxapi.com`
* `https://*.dropboxstatic.com`
* `https://*.dropbox.com`
* `https://*.dropboxusercontent.com`
* `https://dropboxcaptcha.com`
* `https://*.microsoft.com`
* `https://*.microsoftonline.com`
* `https://*.msauth.net`
* `https://*.live.com`
* `https://*.microsoftonline-p.com`

#### Analytics

The following domains are used by tools that help us analyze user activity, improve the Meet products, and debug user problems. Inability to access these domains will result in no perceptible changes to end users, but it will hamper our ability to diagnose issues and improve the product.

* `https://api.amplitude.com`
* `https://www.google-analytics.com`
* `https://*.gstatic.com`
* `https://*.googleapis.com`
* `https://*.google.com`
* `https://*.googleusercontent.com`

### IP Addresses

To provide core service, we also require full IP connectivity (TCP and UDP) to the following IP blocks and port ranges.

#### Cloudflare

For complete access to all JaaS services, the cloudflare IP ranges should also be included in any allow lists. The latest version of this list can be found here: [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/)

#### IPv4

173.245.48.0/20  

103.21.244.0/22  

103.22.200.0/22  

103.31.4.0/22  

141.101.64.0/18  

108.162.192.0/18  

190.93.240.0/20  

188.114.96.0/20  

197.234.240.0/22  

198.41.128.0/17  

162.158.0.0/15  

104.16.0.0/13  

104.24.0.0/14  

172.64.0.0/13  

131.0.72.0/22

#### IPv6

2400:cb00::/32  

2606:4700::/32  

2803:f800::/32  

2405:b500::/32  

2405:8100::/32  

2a06:98c0::/29  

2c0f:f248::/32

#### Video Bridges

JVB video bridges require TCP port 443 and UDP port 10000:

* Australia (Sydney): 168.138.111.128/25
* Brazil (São Paulo): 168.138.245.0/25, 129.148.18.0/26, 129.148.18.64/26
* Germany (Frankfurt): 130.61.162.0/24
* India (Mumbai): 152.67.21.0/24
* Japan (Tokyo): 155.248.191.0/24
* USA East (Ashburn): 193.122.184.0/24
* USA West (Phoenix): 158.101.40.0/25, 129.146.204.128/27, 129.146.205.0/27, 129.146.205.96/27, 129.146.206.64/27
* UK (London): 152.67.144.0/24

#### TURN Relay Servers

TURN servers require TCP port 443, UDP port 443 and UDP ports 49152-65535.

* Australia (Sydney): 168.138.110.244, 168.138.110.59, 192.9.165.175, 150.230.8.96
* Brazil (São Paulo): 168.138.236.29, 168.138.229.53, 168.75.97.79, 167.234.255.126
* Canada (Toronto): 140.238.148.121, 140.238.148.27, 129.153.62.224, 150.230.30.183
* Germany (Frankfurt): 130.61.64.185, 193.122.11.14, 130.162.59.132, 130.61.133.55
* India (Mumbai): 152.67.14.48, 152.67.30.22, 144.24.103.107, 129.154.253.235
* Japan (Tokyo): 168.138.216.49, 168.138.223.155, 158.179.186.219, 131.186.58.42
* Saudi Arabia (Jeddah): 193.122.64.56, 158.101.224.215, 158.101.233.69, 81.208.170.221
* UK (London): 140.238.95.196, 152.67.128.56, 130.162.185.237, 132.226.213.225
* USA East (Ashburn): 193.122.177.113, 193.122.167.175, 129.80.169.133, 129.153.0.67
* USA West (Phoenix): 129.146.227.2, 129.146.219.44, 144.24.35.218, 144.24.7.53

#### Jitsi as a Service Webhook Origins

Webhook responses will come on TCP from these IPs:

* 52.26.201.32
* 52.10.206.157
* 35.162.88.192

#### Copy/Paste

For ease of use, here are all IPs and ranges for copy-paste:

168.138.111.128/25  

168.138.245.0/25  

129.148.18.0/26  

129.148.18.64/26  

130.61.162.0/24  

152.67.21.0/24  

155.248.191.0/24  

193.122.184.0/24  

158.101.40.0/25  

129.146.204.128/27  

129.146.205.0/27  

129.146.205.96/27  

129.146.206.64/27  

152.67.144.0/24  

168.138.110.244  

168.138.110.59  

168.138.236.29  

168.138.229.53  

140.238.148.121  

140.238.148.27  

130.61.64.185  

193.122.11.14  

152.67.14.48  

152.67.30.22  

168.138.216.49  

168.138.223.155  

158.101.192.6  

193.123.38.193  

193.122.64.56  

158.101.224.215  

140.238.95.196  

152.67.128.56  

193.122.177.113  

193.122.167.175  

129.146.227.2  

129.146.219.44  

52.26.201.32  

52.10.206.157  

35.162.88.192  

129.153.62.224  

150.230.30.183  

158.101.233.69  

81.208.170.221  

130.162.59.132  

130.61.133.55  

192.9.165.175  

150.230.8.96  

168.75.97.79  

167.234.255.126  

144.24.103.107  

129.154.253.235  

158.179.186.219  

131.186.58.42  

130.162.185.237  

132.226.213.225  

129.80.169.133  

129.153.0.67  

144.24.35.218  

144.24.7.53

173.245.48.0/20  

103.21.244.0/22  

103.22.200.0/22  

103.31.4.0/22  

141.101.64.0/18  

108.162.192.0/18  

190.93.240.0/20  

188.114.96.0/20  

197.234.240.0/22  

198.41.128.0/17  

162.158.0.0/15  

104.16.0.0/13  

104.24.0.0/14  

172.64.0.0/13  

131.0.72.0/22
