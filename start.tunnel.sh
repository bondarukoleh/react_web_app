# Don't forget to make it executable.
# APP WON'T WORK ON YOUR LOCAL MACHINE PROPERLY, if you want to try something out here in dev mode unfortunately - no.
# Proxy "url" generated with ssh.localhost.run on my local machine, and added as a webhook to sendgrid account that I use
# So to make application work properly on your local machine you need to check where I'm using my integration with
# sendgrid and change it to your keys and urls. Yeah, I'm also sad about it, but proxying your localhost to world web
# for free - never was a simple task.

echo Starting tunnel service...
ssh -R 80:localhost:8080 ssh.localhost.run