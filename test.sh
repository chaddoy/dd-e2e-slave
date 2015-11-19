#!/bin/sh

echo "TEST CASE: $1"
for i in {1..10}
do
	echo "Running test case $i for TEST CASE: $1"
	sleep 2s
done
