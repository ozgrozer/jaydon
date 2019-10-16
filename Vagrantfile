Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.network "private_network", ip: "192.168.56.2"
  config.vm.synced_folder "./", "/var/www/jaydon"
  config.vm.provision :shell, path: "vagrantBootstrap.sh"
end
