#!/bin/bash
for i in `find ./src -name *.js -o -name *.jsx`
do 
#	cat $i | sed '/^\s*$/d' | wc -l
	wc -l $i
done > myLineCount
cat myLineCount | while read num name
do
	sum=$(($sum + $num ))
	echo $num $sum $name
done
