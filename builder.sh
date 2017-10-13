#!/bin/sh
url=ssh://git@101.37.27.99:2289/weichen-group/weichen-platform-web.git
if [ -z "$url" ] ;then
	exit
fi
project_path=${PWD}
tempdir=${project_path}"/bigger"
that_path=$PWD
branch=master
short_name=bigger
p_1=src/main/resources/templates
p_2=src/main/resources/static/static
p1=${tempdir}"/"${p_1}
p2=${tempdir}"/"${p_2}
file_ftl=index.ftl
file_idx=index.html
ab_file_static=${p2}
dist_idx=${project_path}"/dist/"${file_idx}
dist_static=${project_path}"/dist/static/*"

cd $project_path && npm run build

mkdir $tempdir
cd $tempdir
git init
git remote add -f $short_name $url
git config core.autocrlf false
git config core.sparseCheckout true
echo "$p_1" >> .git/info/sparse-checkout
echo "$p_2" >> .git/info/sparse-checkout
git pull $short_name $branch

cd $p1
rm -rf $file_ftl
cp -f $dist_idx $PWD
mv $file_idx $file_ftl
sed -i '1i \<#assign ctx=request.contextPath \/\>' $file_ftl
sed -i 's/\.*\/static/\${ctx}\/static/g' $file_ftl

cd $p2
rm -rf $ab_file_static/*
cp -rf $dist_static $PWD
cd css
tf=$(ls|grep app.*.css$)
echo $tf
sed -i 's/static\/img/\.\.\/img/g' "$tf"

git add $p1"/"$file_ftl
git add $ab_file_static .
git commit -m "front build"
git push $short_name $branch

rm -rf $tempdir
echo "build complete 后台基本设置分离上测试环境"
read -n1 var