"use client"

import React from "react"
import type { TransactionType } from "../types/transaction.types"
import { formatRelative, subDays } from "date-fns"
import { toCapitalizeFirstLetter } from "@/utils/string.utils"
import { currencyFormatter } from "@/utils/currencyFormatter.utils"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTransaction } from "@/actions/transaction.action"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"

interface TransactionCardProps {
  transaction: TransactionType
}

export default function TransactionCard(props: TransactionCardProps) {
  const { transaction } = props
  const { user } = useUser()
  const userId = user?.publicMetadata.dbUserId as string
  const queryClient = useQueryClient()
  const [isExpanded, setIsExpanded] = React.useState(false)

  const mutation = useMutation({
    mutationFn: () => deleteTransaction(userId, transaction._id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] })
      queryClient.invalidateQueries({ queryKey: ["category"] })
    },
  })

  const handleDeleteTransaction = () => {
    mutation.mutate()
  }

  const cardVariants = {
    collapsed: {
      height: "auto",
      backgroundColor: "transparent",
    },
    expanded: {
      height: "auto",
      backgroundColor: "rgb(23, 23, 23)", // neutral-900
    },
  }

  const detailsVariants = {
    collapsed: {
      opacity: 0,
      height: 0,
      marginTop: 0,
    },
    expanded: {
      opacity: 1,
      height: "auto",
      marginTop: "0.5rem",
    },
  }

  return (
    <motion.div
      className="py-2 px-4 rounded-sm flex flex-col justify-between items-center cursor-pointer"
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={cardVariants}
      whileHover="expanded"
      onClick={() => setIsExpanded(!isExpanded)}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="w-full flex justify-between items-center">
        <div>
          <p className="text-base font-medium">{transaction.name}</p>
          <p className="text-xs text-neutral-300">
            {toCapitalizeFirstLetter(formatRelative(subDays(new Date(transaction.updatedAt), 0), new Date()))}
          </p>
        </div>
        <div className="flex flex-col justify-center items-end">
          <p
            className={cn(
              "font-semibold",
              transaction.transactionType === "Credit" ? "text-green-500" : "text-red-500",
            )}
          >
            {transaction.transactionType === "Credit" ? "+ " : "- "}
            {currencyFormatter(transaction.transactionAmount, 0)}
          </p>
        </div>
      </div>

      <motion.div className="w-full" variants={detailsVariants} transition={{ duration: 0.3, ease: "easeInOut" }}>
        <div className="flex justify-between w-full pt-2">
          {(
            <motion.p
              className="text-xs text-neutral-400 leading-5 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {transaction?.description}
            </motion.p>
          )}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={(e) => {
              e.stopPropagation() // Prevent card toggle when clicking the button
            }}
          >
            <Button variant={"destructive"} size={"icon"} onClick={handleDeleteTransaction}>
              <Trash2 className="size-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
