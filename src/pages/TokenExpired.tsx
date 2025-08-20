import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"
import * as React from "react"

const TokenExpired: React.FC = () => {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="p-6 rounded-2xl shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <ShieldAlert className="h-7 w-7 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Reset Link Expired</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Your password reset link is no longer valid. This can happen if
                the link was used already or if too much time has passed.
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <Alert variant="destructive">
              <AlertDescription className="text-sm text-center">
                For your security, reset links expire after a short period.
                Please request a new one.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TokenExpired
