for dir in ./iconpacks/*
do
  if [ -d $dir ]
  then
    echo Updating $dir ...
    (cd $dir; git pull origin master)
  fi
done
